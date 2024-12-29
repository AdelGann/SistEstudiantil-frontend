import { useEffect, useState } from "react";
import axios from "axios";

type HookData<T> = {
	data: T[];
	isLoading: boolean;
	reloadFetchData: () => Promise<void>;
	setFilterData: (data: T[]) => void;
};

export const useGetFetch = <T>(endPoint: string): HookData<T> => {
	const [data, setData] = useState<T[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const getFetchData = async () => {
		try {
			const resp = await axios.get(`${process.env.API_URL}${endPoint}`);
			const responseData = resp.data;

			setData(responseData);
			setIsLoading(false);
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		}
	};

	const reloadFetchData = async () => {
		await getFetchData();
	};

	const setFilterData = (data: T[]) => {
		setData(data);
	};

	useEffect(() => {
		getFetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		data,
		isLoading,
		reloadFetchData,
		setFilterData,
	};
};
