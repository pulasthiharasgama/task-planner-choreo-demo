import ballerina/cache;
import ballerina/http;
import ballerina/io;

listener http:Listener httpListener = new (8080);
cache:Cache cache = new ();

public service class Service {
    *http:Service;

    @http:ResourceConfig {
        cors: {allowOrigins: ["*"]}
    }
    resource function get planner/tasks() returns json|error {
        string[] keys = cache.keys();

        json[] tasks = [];

        foreach string key in keys {
            json val = <json>check cache.get(key);
            tasks.push(val);
        }

        json resp = {status: "success", data: tasks};
        return resp;
    }

    @http:ResourceConfig {
        cors: {allowOrigins: ["*"]}
    }
    resource function get planner/tasks/[int id]() returns json|error {
        if (cache.hasKey(id.toString())) {
            json val = <json>check cache.get(id.toString());
            return val;
        } else {
            json resp = {"status": "failed", "error": "ID not found"};
            return resp;
        }
    }

    @http:ResourceConfig {
        cors: {allowOrigins: ["*"]}
    }
    resource function post planner/tasks(@http:Payload TaskPayload payload) returns json|error {
        io:println("Invoked with payload: ", payload);
        check cache.put(payload.id.toString(), payload);
        json resp = {"status": "success"};
        return resp;
    }
}

type TaskPayload record {|
    int id;
    string dueDate;
    string reminderText;
    string reminderDescription;
|};

public function main() returns error? {

    http:Service plannerService = new Service();
    check httpListener.attach(plannerService);

    string initialDataPath = "initialData.json";
    json initialDataJson = check io:fileReadJson(initialDataPath);
    json initialDataCopy = initialDataJson.cloneReadOnly();
    TaskPayload[] initialData = <TaskPayload[]>initialDataCopy;

    foreach TaskPayload entry in initialData {
        check cache.put(entry.id.toString(), entry);
    }
}
