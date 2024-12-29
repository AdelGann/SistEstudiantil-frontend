/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "./use-toast";

export const useDeleteFetch = (
	endPoint: string,
	title: string,
	description: string,
	reloadFetchData?: () => void,
	onSuccessCallback?: () => void
) => {
	const { toast } = useToast();

	const [isLoadingDelete, setIsLoadingDelete] = useState(true);
	const [errorDelete, setErrorDelete] = useState<unknown>(null);
	const [successDelete, setSuccessDelete] = useState<boolean>(false);

	const setInitStateDelete = () => {
		setIsLoadingDelete(false);
		setErrorDelete(null);
		setSuccessDelete(false);
	};

	useEffect(() => {
		if (successDelete) {
			if (title) {
				toast({ title, description });
			}

			setInitStateDelete();

			if (reloadFetchData) {
				reloadFetchData();
			}

			if (onSuccessCallback) {
				onSuccessCallback();
			}
		} else {
			if (errorDelete !== null) {
				toast({
					title: "Something went wrong",
					description: `${errorDelete}`,
					variant: "destructive",
				});
			}
		}
	}, [successDelete, errorDelete]);

	const deleteFetchData = async (
		id: string,
		id2?: string,
		id3?: string,
		id4?: string,
		id5?: string
	) => {
		try {
			const token = localStorage.getItem("rt__SistEstudiantil");
			const headers = {
				Authorization: `Bearer ${token}`,
			};
			await axios.delete(
				`${process.env.API_URL}${endPoint}/${id}${id2 ? "/" + id2 : ""}${id3 ? "/" + id3 : ""}${
					id4 ? "/" + id4 : ""
				}${id5 ? "/" + id5 : ""}`,
				{ headers }
			);

			setSuccessDelete(true);
			setIsLoadingDelete(false);
		} catch (error) {
			setErrorDelete(error);
			setIsLoadingDelete(false);
		}
	};

	return {
		deleteFetchData,
		isLoadingDelete,
	};
};
