import { setAuthHeader } from "../helper/auth";

const base_URL = "http://localhost:8001/v1/course/";

class CourseService {
    createMaterial(body) {
        const headers = setAuthHeader();
        headers["Accept"] = "application/json";
        
        return fetch(base_URL + "create/material", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        });
    }

    getContributedCourse() {
        const headers = setAuthHeader();
        headers["Accept"] = "application/json";

        return fetch(base_URL + "contributed", {
            method: "GET",
            headers: headers
        });
    }
    createCourse(body) {
        const headers = setAuthHeader();
        headers["Accept"] = "application/json";

        return fetch(base_URL + "create/description", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        });
    }

    uploadImage(file) {
        const headers = setAuthHeader();
        const formData = new FormData();

        headers["Accept"] = "application/json";
        delete headers["Content-Type"];
        formData.append("imageFile", file)

        return fetch(base_URL + "upload-image", {
            method: "POST",
            headers: headers,
            body: formData
        })
    }

    createSection(body) {
        const headers = setAuthHeader();
        headers["Accept"] = "application/json";

        return fetch(base_URL + "create/section", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        });
    }

    getCourseDetail(cid) {
        const headers = setAuthHeader();
        headers["Accept"] = "application/json";

        return fetch(base_URL + cid, {
            method: "GET",
            headers: headers
        });
    }

    getSyllabus(cid) {
        const headers = setAuthHeader();
        headers["Accept"] = "application/json";

        return fetch(base_URL + "syllabus/" + cid, {
            method: "GET",
            headers: headers
        });
    }

    getMaterial(cid, sid) {
        const headers = setAuthHeader();
        headers["Accept"] = "application/json";
        
        return fetch(base_URL + "syllabus/" + cid + "/" + sid, {
            method: "GET",
            headers: headers
        });
    }

    saveUserProgress(mid) {
        const headers = setAuthHeader();
        headers["Accept"] = "application/json";
        
        return fetch(base_URL + "progress/" + mid, {
            method: "POST",
            headers: headers
        });
    }
}

export default new CourseService()
