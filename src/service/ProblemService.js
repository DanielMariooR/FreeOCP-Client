import { setAuthHeader } from "../helper/auth";

const base_URL = "http://localhost:8001/v1/problem/";

class ProblemService {
    createProblem(body) {
        const headers = setAuthHeader();
        headers["Accept"] = "application/json";
        
        return fetch(base_URL + "create", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        });
    }

    getProblemById(id) {
        const headers = setAuthHeader();
        headers["Accept"] = "application/json";

        return fetch(base_URL + "candidate/" + id, {
            method: "GET",
            headers: headers
        });
    }

    acceptProblemCandidate(id) {
        const headers = setAuthHeader();
        headers["Accept"] = "application/json";

        return fetch(base_URL + "accept/" + id, {
            method: "PUT",
            headers: headers,
        });
    }

    rejectProblemCandidate(id) {
        const headers = setAuthHeader();
        headers["Accept"] = "application/json";

        return fetch(base_URL + "reject/" + id, {
            method: "PUT",
            headers: headers,
        });
    }
}

export default new ProblemService();