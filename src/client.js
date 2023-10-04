import axios from 'axios'
import { SERVER_URL } from './config'

export const signupFormSubmit = async (username, firstname, lastname, password, email) => {
    
    const payload = {
        username: username,
        firstname: firstname,
        lastname: lastname,
        password: password,
        email: email,
    };

    try {
        const res = await fetch(SERVER_URL + 'signup', {method: 'POST',
                                                        headers: {'Content-Type': 'application/json'},
                                                        body: JSON.stringify(payload)
                                                    });

        if (res.ok) {
            const resJson = await res.json()
            localStorage.setItem('app_token', resJson.token)

            return true
        } else {
            console.error('Contact request failed:', res.status)
            // const resJson = await res.json();
            // console.log(resJson.msg);
            // console.log(resJson);


            return false
        }
    } catch (error) {
    console.error('Error:', error)

    return false
    }
}
export const loginFormSubmit = async (username, password) => {
    console.log(username, password);
    const payload = {
        username: username,
        password: password,
    };

    try {
        const res = await fetch(SERVER_URL + 'obtain-token', {method: 'POST', 
                                                              headers: {'Content-Type': 'application/json'}, 
                                                              body: JSON.stringify(payload)
                                                            });
        console.log('after fetch')
        console.log(res);
        if (res.ok) {
            const resJson = await res.json()
            console.log(resJson);
            localStorage.setItem('app_token', resJson.token)

            return true
        } else {
            console.error('Login request failed:', res.status)

            return false
        }
    } catch (error) {
    console.error('Error:', error)

    return false
    }
}

export const authenticateToken = async (token) => {
    
    try {
        const res = await fetch(SERVER_URL + 'validate-token', {method: 'GET',
                                                                headers: {'Authorization': `Token ${token}`}
                                                            });

        if (res.ok) {
            const resJson = await res.json()
            return resJson

        } 
        // else {
        //     // console.log('NO!!!');
        //     // console.log(res)

        //     return false

        // }
    } catch (error) {
    console.error('Error:', error)

    return false
    }
}

export const fetchDataPagination = async (pageNum, pageSize, paramsString='') => {
    const url = `${SERVER_URL}rss_pagination?num=${pageNum}&size=${pageSize}${paramsString}`
    console.log('url', url);
    const res = await fetch(url)
    const resJson = await res.json()
    // console.log(`${SERVER_URL}rss_pagination?num=${pageNum}&size=${pageSize}`);
    // console.log(resJson);
    // console.log(resJson.has_more);

    return resJson
}

export const fetchVersionData = async (version_name) => {
    const res = await fetch(`${SERVER_URL}rss_pagination?version_name=${version_name}`)
    const resJson = await res.json()
    return resJson
}

export const fetchVersionDateData = async (paramsString='') => {
    console.log('fetchVersionDateData', `${SERVER_URL}rss_pagination?${paramsString}`);
    const res = await fetch(`${SERVER_URL}rss_pagination?${paramsString}`)
    const resJson = await res.json()
    return resJson
}

export const fetchData = async (paramsString='') => {
    console.log('IN DATA');
    console.log(`${SERVER_URL}rss_pagination?${paramsString}`);
    try {
        const res = await fetch(`${SERVER_URL}rss`)
        // console.log('after');
        const resJson = await res.json()
        console.log('data resJson', resJson);
        return resJson
    } catch (error) {
        console.error('Error:', error);
        // throw error;
    }

}

export const fetchVersions = async (version_name) => {
    // console.log('IN');
    const res = await fetch(`${SERVER_URL}versions`)
    const resJson = await res.json()
    return resJson
}
