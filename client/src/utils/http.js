import Taro from '@tarojs/taro'



class httpRequest {

  baseOptions(params, method = "GET") {
    let { url, data } = params;
    // const BASE_URL = getBaseUrl(url).BASE_URL;
    const BASE_URL = 'http://10.0.42.145:8888';
    let contentType = "application/json";
    contentType = params.contentType || contentType;
    // console.log(Taro.getStorageSync('CheckInToken'),'CheckInToken http---------------');
    const option = {
      url: BASE_URL + url,
      data: data,
      method: method,
      header: {
        'content-type': contentType
      }
    };
      return Taro.request(option);
    }

  get(url, data = "") {
    let option = { url, data };
    return this.baseOptions(option);
  }

  post(url, data, contentType) {
    let params = { url, data, contentType };
    return this.baseOptions(params, "POST");
  }

  put(url, data = "") {
    let option = { url, data };
    return this.baseOptions(option, "PUT");
  }

  delete(url, data = "") {
    let option = { url, data };
    return this.baseOptions(option, "DELETE");
  }

}

export default new httpRequest()
