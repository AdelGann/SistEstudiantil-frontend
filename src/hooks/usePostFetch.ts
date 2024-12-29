/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

import { useToast } from "./use-toast";

export const usePostFetch = (
	endPoint: string,
	title?: string,
	description?: string,
	reloadFetchData?: () => void
) => {
	const { toast } = useToast();
	const [isLoadingPost, setIsLoadingPost] = useState<boolean>(false);
	const [errorPost, setErrorPost] = useState<unknown>(null);
	const [successPost, setSuccessPost] = useState<boolean>(false);

	const setInitStatePost = () => {
		setIsLoadingPost(false);
		setErrorPost(null);
		setSuccessPost(false);
	};

	useEffect(() => {
		if (successPost) {
			if (title) {
				toast({ title, description });
			}

			setInitStatePost();
			if (reloadFetchData) {
				reloadFetchData();
			}
		} else {
			if (errorPost !== null) {
				toast({
					title: "Something went wrong",
					description: `${errorPost}`,
					variant: "destructive",
				});
			}
		}
	}, [successPost, errorPost]);

	const postFetchData = async <T>(
		data: T[],
		query?: string,
		isBlob?: boolean,
		returnFullResponse?: boolean
	): Promise<unknown> => {
		try {
			setIsLoadingPost(true);
			const token = localStorage.getItem("rt__SistEstudiantil");
			const headers = {
				Authorization: `Bearer ${token}`,
			};

			let resp: AxiosResponse<T>;
			if (!isBlob) {
				resp = await axios.post(
					`${process.env.API_URL}${endPoint}${query ? `?${query}` : ""}`,
					data,
					{
						headers,
					}
				);
			} else {
				resp = await axios.post(
					`${process.env.API_URL}${endPoint}${query ? `?${query}` : ""}`,
					data,
					{
						responseType: "blob",
					}
				);
			}

			setIsLoadingPost(false);
			setSuccessPost(true);

			if (returnFullResponse) {
				return resp;
			}

			return resp.data;
		} catch (error) {
			setIsLoadingPost(false);
			setErrorPost(error);
		}
	};

	return {
		postFetchData,
		isLoadingPost,
	};
};
