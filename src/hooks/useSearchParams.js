import { useSearchParams as useRRDSearchParams } from "react-router-dom";
import queryString from "query-string";

/**
 * Extended from `useSearchParams` hook from "react-router-dom". To
 * eliminate the empty value, parse number value, boolean value and array value.
 * @param {object} defaultValue Default value of search params.
 */
export function useSearchParams(defaultValue) {
  const [urlSearchParams, setUrlSearchParams] = useRRDSearchParams(defaultValue);
  const urlSearchParamsObject = Object.entries([...urlSearchParams]);

  const stringifyObject = (objectValue) => {
    const config = { arrayFormat: "index", skipEmptyString: true, skipNull: true };
    return queryString.stringify(objectValue, config);
  };

  const objectifyString = (stringValue) => {
    const config = { arrayFormat: "index", parseBoolean: true, parseNumbers: true };
    return queryString.parse(stringValue, config);
  };

  const setSearchParams = (objectValue, navigationOpts) => {
    const queryParams = stringifyObject(objectValue); // To eliminate empty value.
    setUrlSearchParams(queryParams, navigationOpts);
  };

  const searchParamsAsString = stringifyObject(urlSearchParamsObject);
  const searchParamsAsObject = objectifyString(searchParamsAsString);

  return [searchParamsAsObject, searchParamsAsString, setSearchParams];
}