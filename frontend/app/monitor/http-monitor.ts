import { mask } from './utils/mask-util';

export const httpMonitor = (trackEventHttp: any) => {
  return {
    request: (method: string, url: string, data: any) => {
      const copyData = objectSign(data);
      console.log('request', data);
      trackEventHttp(
        method,
        null,
        getUrlNormalized(getEndpoint(url)),
        normalizeRequest(copyData)
      );
    },
    response: (method: string, status: number, url: string, data: any) => {
      const copyData = objectSign(data);
      trackEventHttp(
        method,
        status,
        getUrlNormalized(getEndpoint(url)),
        normalizeResponse(copyData)
      );
    },
  };
};

function getEndpoint(url: string): string {
  const index = url.indexOf('/', url.indexOf('//') + 2);
  return url.substring(index);
}

function getUrlNormalized(url: string | undefined) {
  return mask.url(url ?? '');
}

function normalizeRequest(data: any) {
  return maskPasswordFields(data);
}

/**
 *
 *
 * Processes the input data, normalizing it by converting arrays into a string that indicates the item count.
 *
 * If the input is an empty object, it returns `null`. In case of an error, it returns an empty string.
 *
 *
 *
 * @param input - The input data to be normalized. It can be an array, object, or any type.
 * @returns - Returns an object with the item count if the input is an array,
 * `null` if the input is an empty object, or the processed object. If an error occurs, returns an empty string.
 */
function normalizeResponse(input: any): any | null {
  try {
    if (Array.isArray(input)) {
      return { data: `${input.length} item${input.length > 1 ? 's' : ''}` };
    }

    if (input && typeof input === 'object' && Object.keys(input).length === 0) {
      return null;
    }

    return replaceArraysWithCount(input);
  } catch (e) {
    console.error(e);
    return '';
  }
}

/**
 *
 *
 * Recursively traverses an object and replaces any array found with a string indicating
 *
 * the number of items in that array. Works for objects with any depth of nesting.
 *
 *
 *
 * Example:
 *
 * {
 *
 *   "items": "3 items",
 *
 *   "user": {
 *
 *     "devices": "1 item",
 *
 *    }
 *
 * }
 *
 *
 *
 * @param obj - The object to be processed.
 * @returns - The object with arrays replaced by item count strings.
 */
function replaceArraysWithCount(obj: any): any {
  function recurse(obj: any) {
    for (const key in obj) {
      if (Array.isArray(obj[key])) {
        const itemCount = obj[key].length;
        obj[key] = `${itemCount} item${itemCount > 1 ? 's' : ''}`;
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        recurse(obj[key]);
      }
    }
  }

  recurse(obj);

  return obj;
}

/**
 *
 *
 * Recursively checks if any field in the object has the key 'password' and replaces its value with '***'.
 *
 *
 *
 * @param obj - The object to be checked and modified.
 * @returns - The modified object with 'password' fields replaced by '***'.
 */
function maskPasswordFields(obj: any): any {
  /**
   *
   *
   * Helper function to recursively traverse the object.
   *
   *
   *
   * @param obj - The current level of the object being processed.
   */
  function recurse(obj: any) {
    for (const key in obj) {
      if (key.toLowerCase() === 'password') {
        // If the key is 'password', replace the value with '***'
        obj[key] = '***';
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        // If the value is an object, recursively process it
        recurse(obj[key]);
      }
    }
  }

  recurse(obj); // Start recursion with the initial object
  return obj; // Return the modified object
}

/**
 *
 *
 * Creates a deep copy of an object, ensuring the original is not modified.
 *
 *
 *
 * @returns A deep copy of the `param` object.
 *
 * @description
 * The `JSON.parse(JSON.stringify(param))` technique is used to create a deep copy of JavaScript objects.
 * It works by converting the object into a JSON string (using `JSON.stringify`) and then converting that
 * string back into a new object (using `JSON.parse`). This is sufficient in most cases where the object contains
 * only values that can be represented in JSON format, such as:
 * - Numbers
 * - Strings
 * - Arrays
 * - Plain objects
 *
 * **Limitations**:
 * - Does not copy functions, `Date` objects, `Map`, `Set`, or other complex objects.
 * - For circular references (where an object references itself), this technique will fail.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify|JSON.stringify}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse|JSON.parse}
 * @param data
 */
function objectSign(data: any): any {
  try {
    return JSON.parse(JSON.stringify(data));
  } catch (e) {
    console.error(e);
    return data;
  }
}
