export const deepEqual = (a: any, b: any): boolean => {
  if (a === b) return true;

  if (a && b && typeof a === 'object' && typeof b === 'object') {
    if (Array.isArray(a)) {
      return (
        a.length === b.length &&
        a.every((elem, index) => deepEqual(elem, b[index]))
      );
    }

    if (a instanceof Set && b instanceof Set) {
      return (
        a.size === b.size &&
        Array.from(a.entries()).every(([key]) => b.has(key))
      );
    }

    if (a instanceof Map && b instanceof Map) {
      return (
        a.size === b.size &&
        Array.from(a.entries()).every(([key, value]) => {
          return b.has(key) && deepEqual(value, b.get(key));
        })
      );
    }

    const keys = {
      a: Object.keys(a),
      b: Object.keys(b),
    };

    return (
      a.constructor === b.constructor &&
      keys.a.length === keys.b.length &&
      keys.a.some((key) => Object.prototype.hasOwnProperty.call(b, key)) &&
      keys.a.every((key) => deepEqual(a[key], b[key]))
    );
  }

  return Number.isNaN(a) && Number.isNaN(b);
};

export const deepClone = <T>(obj: T): T => {
  if (typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    return (obj as any[]).map((elem) => deepClone(elem)) as any as T;
  }

  if (obj instanceof Set) {
    const clone = new Set();

    obj.forEach((elem) => clone.add(deepClone(elem)));

    return clone as any as T;
  }

  if (obj instanceof Map) {
    const clone = new Map();

    obj.forEach((value, key) => {
      clone.set(key, value);
    });

    return clone as any as T;
  }

  const clone = {} as T;

  Object.keys(obj).forEach((key) => {
    clone[key] =
      typeof obj[key] === 'object' && obj[key] !== null
        ? deepClone(obj[key])
        : (clone[key] = obj[key]);
  });

  return clone;
};

export const setData = (key: string, data: object) =>
  localStorage.setItem(key, JSON.stringify(data));

export const getData = (key: string) => JSON.parse(localStorage.getItem(key));

export const manageErrors = (response) => {
  if (!response.ok) {
    const responseError = {
      message: `${response.status} ${response.statusText}`,
    };
    throw responseError;
  }

  return response;
};
