import { setAuthHeader } from "../helper/auth";

const base_URL = "http://localhost:8001/v1/assignment/";

class AssignmentService {
    getAssignmentProblems(id) {
        const headers = setAuthHeader();
        headers["Accept"] = "application/json";

        return fetch(base_URL + id, {
            method: "GET",
            headers: headers
        });
    }

    submitAssignment(body){
        const headers = setAuthHeader();
        headers["Accept"] = "application/json";

        return fetch(base_URL + "create", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        });
    }

    calculateAssignmentScore(id, body) {
        const headers = setAuthHeader();
        headers["Accept"] = "application/json";

        return fetch(base_URL + id, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        });
    }
}

export default new AssignmentService();