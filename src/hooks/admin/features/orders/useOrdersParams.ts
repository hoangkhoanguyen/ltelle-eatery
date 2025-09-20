import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

const useOrdersParams = () => {
  const [query, setQuery] = useQueryStates({
    limit: parseAsInteger.withDefault(10),
    page: parseAsInteger.withDefault(1),
    search: parseAsString.withDefault(""),
  });

  return { query, setQuery };
};

export default useOrdersParams;
