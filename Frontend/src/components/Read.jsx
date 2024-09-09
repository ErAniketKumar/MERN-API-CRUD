import React, { useEffect, useState } from "react";
import { CiTrash } from "react-icons/ci";

import { FaRegEdit } from "react-icons/fa";

import { Link, Navigate, useNavigate } from "react-router-dom";

function Read() {
	const [data, setData] = useState("");
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const API_URL = import.meta.env.VITE_API_URL;

	const handleDelete = async (id) => {

		try {
			const response = await fetch(`${API_URL}${id}`, {
				method: "DELETE",
			});

			const result = await response.json();
			if (!response.ok) {
				console.log(result.error);
				setError(result.error);
			}
			if (response.ok) {
				setError("Data Deleted Successfully");
				setTimeout(() => {
					setError("");
					fetchDataFromDb();
				}, 1000);
			}
		} catch (error) {
			setError(error.message);
		}
	};

	const fetchDataFromDb = async () => {
		try {
			const response = await fetch(API_URL);
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			const result = await response.json();
			setData(result);
		} catch (error) {
			setError(error.message);
			console.error("Fetch error: ", error);
		}
	};

	useEffect(() => {
		fetchDataFromDb();
	}, []);

	return (
		<div className="px-10">
			<div className="grid md:grid-cols-4 sm:grid-cols-2  gap-4">
				{error && <div className="text-red-500">{error}</div>}
				{data && data.length > 0 ? (
					data.map((item, index) => (
						<div key={index} className="card flex flex-col shadow-md p-10">
							<span>Name: {item.name}</span>
							<span>Email: {item.email}</span>
							<span>Age: {item.age}</span>
							<span className="flex gap-4">
								<CiTrash
									onClick={() => handleDelete(item._id)}
									className="cursor-pointer text-xl text-red-500"
								/>
								<Link to={`/${item._id}`}>
									<FaRegEdit className="cursor-pointer text-xl text-green-500" />
								</Link>
							</span>
						</div>
					))
				) : (
					<div>No data available</div>
				)}
			</div>
		</div>
	);
}

export default Read;
