
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useToast } from "./use-toast";

export const useUpdateFetch = (
	endPoint: string,
	sectionName?: string,
	description?: string,
	reloadFetchData?: () => void
) => {
	const { toast } = useToast();
	
	const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false);
	const [errorUpdate, setErrorUpdate] = useState<unknown>(null);
	const [successUpdate, setSuccessUpdate] = useState<boolean>(false);

	const setInitStateUpdate = () => {
		setIsLoadingUpdate(false);
		setErrorUpdate(null);
		setSuccessUpdate(false);
	};

	useEffect(() => {
		if (successUpdate) {
			if (sectionName) {
				toast({ title: sectionName, description });
			}
			setInitStateUpdate();
			if (reloadFetchData) {
				reloadFetchData();
			}
		} else {
			if (errorUpdate !== null) {
				toast({
					title: "Something went wrong",
					description: `${errorUpdate}`,
					variant: "destructive",
				});
			}
		}
	}, [successUpdate, errorUpdate]);

	const updateFetchData = async <T>(
		id: string,
		data: T,
		id2?: string,
		id3?: string,
		id4?: string,
		id5?: string
		
	): Promise<AxiosResponse<T>> => {
		try {
			setIsLoadingUpdate(true);
			const token = localStorage.getItem("rt__SistEstudiantil");
			const headers = {
				Authorization: `Bearer ${token}`,
			};
			const response = await axios.patch(
				`${process.env.API_URL}${endPoint}/${id}${id2 ? "/" + id2 : ""}${id3 ? "/" + id3 : ""}${
					id4 ? "/" + id4 : ""
				}${id5 ? "/" + id5 : ""}`,
				data,
				{ headers }
			);

			setIsLoadingUpdate(false);
			setSuccessUpdate(true);
			return response;
		} catch (error) {
			setIsLoadingUpdate(false);
			setErrorUpdate(error);
			throw error;
		}
	};

	return {
		updateFetchData,
		isLoadingUpdate,
	};
};
