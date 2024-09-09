import React, { useEffect, useState } from "react";
import {useNavigate, useParams } from "react-router-dom";
function Update() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [age, setAge] = useState("");
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const API_URL = import.meta.env.VITE_API_URL;

	const { id } = useParams();

	async function getSingleUser() {
		const response = await fetch(`${API_URL}${id}`);
		const result = await response.json();
		if (!response.ok) {
			console.log(result.error);
			setError(result.error);
		}
		if (response.ok) {
			setName(result.name);
			setEmail(result.email);
			setAge(result.age);
			setError("");
			console.log(result);
		}
	}

	//send updated data to backend
	async function HandleUpdateSubmit(event) {
		event.preventDefault();
		const updateUser = {
			name,
			email,
			age,
		};
		try {
			const response = await fetch(`${API_URL}${id}`, {
				method: "PATCH",
				body: JSON.stringify(updateUser),
				headers: {
					"Content-type": "application/json",
				},
			});

			const result = await response.json();

			if (!response.ok) {
				console.log(result.error);
				setError(result.error);
			}

			if (response.ok) {
				setError("");
				navigate("/");
				// console.log(result);
			}
		} catch (error) {
			setError(error);
			console.log(error);
		}
	}

	useEffect(() => {
		getSingleUser();
	}, []);

	return (
		<>
			<div className="px-10">
				{error && (
					<div
						className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-red-800 dark:text-white"
						role="alert"
					>
						<span className="font-medium">Info alert!</span> {error}
					</div>
				)}
				<div className="flex justify-center">
					<div className="flex flex-col w-1/2">
						<h1>Update Post</h1>
						<form
							className="flex flex-col gap-4"
							action={API_URL}
							method="post"
							onSubmit={HandleUpdateSubmit}
						>
							<input
								className="outline-none bg-gray-200 py-1"
								type="text"
								name="name"
								placeholder="name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
							<input
								className="outline-none bg-gray-200 py-1"
								type="email"
								name="email"
								placeholder="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<input
								className="outline-none bg-gray-200 py-1"
								type="number"
								name="age"
								placeholder="age"
								value={age}
								onChange={(e) => setAge(parseInt(e.target.value))}
							/>
							<button
								className="bg-blue-500 py-2 rounded text-white hover:bg-green-500"
								type="submit"
							>
								Update
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export default Update;
