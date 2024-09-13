//Bật tắt log server api ở đây (false là tắt)
const SHOW_LOG_REQUEST = true;

export function describeSuccessResponse(response: any) {
  if (!SHOW_LOG_REQUEST) {
    return;
  }
  console.group(
    `%c[${response.config.method?.toUpperCase()}---%c${response.status}] %c${
      response.config.url
    }%c @ ${Date.now() - response.config.startTime}ms`,
    'color: gray',
    'color: blue',
    'color: black',
    'color: gray; font-weight: lighter',
  );

  if (response.config.params) {
    console.groupCollapsed('%c params', 'color: gray');
    console.log(response.config.params);
    console.groupEnd();
  }

  if (response.config.headers) {
    console.groupCollapsed('%c headers', 'color: gray');
    console.table(response.config.data);
    console.groupEnd();
  }

  if (response.config.data) {
    console.groupCollapsed('%c body', 'color: gray');
    console.table(response.config.data);
    console.groupEnd();
  }

  if (response.data) {
    console.groupCollapsed('%c data', 'color: gray');
    console.log(response.data);
    console.groupEnd();
  }

  console.groupEnd();
}

export function describeErrorResponse(error: any) {
  if (!SHOW_LOG_REQUEST) {
    return;
  }
  //-----------------------------------------------------
  console.group(
    '%c Error',
    'color: white; background-color: #D33F49',
    'WEBSERVICE: RESPONSE',
  );
  if (error.response) {
    const request = error.response.request || error.request || {};
    console.log(`URI: ${error?.config?.url}`);
    console.log(`STATUS: ${error.response.status}`);
    console.log(`METHOD: ${error?.response?.config?.method?.toUpperCase()}`);
    //--------------------------------------------
    if (request.headers) {
      console.groupCollapsed('HEADERS');
      console.table(request.headers);
      console.groupEnd();
    }
    //------------------------------------------------
    console.groupCollapsed('DATA');
    console.log(error.response);
    console.groupEnd();
    //------------------------------------------------
  } else if (error.request) {
    console.log(`URI: ${error.config?.url}`);
    //--------------------------------------------
    console.groupCollapsed('REQUEST');
    console.log(error.request);
    console.groupEnd();
  } else {
    console.log(`UNKNOWN ERROR: ${error.message}`);
  }
  //------------------------------------------------
  console.groupCollapsed('RESPONSE');
  console.log(error);
  console.groupEnd();
  //------------------------------------------------
  //------------------------------------------------
  console.groupCollapsed('CONFIG');
  console.log(error.config);
  console.groupEnd();
  //------------------------------------------------
  console.groupEnd();
}
