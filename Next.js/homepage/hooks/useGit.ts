import axios from "axios";
import useSWR from "swr";
import { Response } from "../features/git/gitSlice";
import { gitFetch } from "../features/git/gitSlice";
import { useAppDispatch } from "./useAppDispatch";

const useGit = () => {
  const url = "https://api.github.com/users/koyama1003/events";
  const dispatch = useAppDispatch();
  dispatch(gitFetch(url));
  const fetcher = (): Promise<Response> => axios.get(url);
  const { data, error } = useSWR(url, fetcher);
  const git = data?.data?.slice(0, 5);

  return {
    git,
    isLoading: !error && data,
    isError: error,
  };
};

export default useGit;
