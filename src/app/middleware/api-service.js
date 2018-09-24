
const apiService = store => next => (action) => {
  const { request, types, ...rest } = action;

  if (!request) {
    return next(action);
  }

  const [REQUEST, SUCCESS, FAILURE, NO_DATA_SUCCESS] = types;
  next({ ...rest, type: REQUEST });

  return fetch(request).then((res) => {
    if (res.status === 200) {
      return res.json()
        .then(result => next({
          ...rest,
          result,
          type: SUCCESS,
        }));
    }
    if (!res.ok) {
      return res.json().then(errors => (
        next({
          ...rest,
          errors,
          type: FAILURE,
        })
      ));
    }

    return next({ ...rest, type: NO_DATA_SUCCESS || SUCCESS });
  });
};

export default apiService;
