import axios from "axios";
import useSWR, { responseInterface } from "swr";

interface data {
  id: number;
  repo: { name: string };
  created_at: Date;
  actor: { avatar_url: string };
  type: string;
  payload: { commits: { message: string }[] };
}

interface Response extends data {
  data: {
    slice: <T, U>(arg1: T, arg2: U) => data[];
  };
}

const useGit = () => {
  const url = "https://api.github.com/users/koyama1003/events";
  const fetcher = (): Promise<Response> => axios.get(url);
  const { data, error }: responseInterface<Response, Error> = useSWR(
    url,
    fetcher
  );
  return {
    git: data?.data?.slice(0, 5),
    isLoading: !error && data,
    isError: error,
  };
};

export default useGit;
