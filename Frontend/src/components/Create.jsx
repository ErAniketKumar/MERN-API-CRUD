import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Create() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [age, setAge] = useState("");
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const API_URL = import.meta.env.VITE_API_URL;
	// useEffect(() => {
	// 	console.log(name, email, age);
	// }, [name, email, age]);

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		const addUser = {
			name,
			email,
			age,
		};

		const response = await fetch(API_URL, {
			method: "POST",
			body: JSON.stringify(addUser),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const result = await response.json();
		if (!response.ok) {
			setError(result.message);
			console.log(result.error);
			console.log(error);
		}
		if (response.ok) {
			setError("");
			setName("");
			setEmail("");
			setAge("");
			navigate('/');
		}
	};

	return (
		<>
			<div className="px-10">
				{error && (
					<div
						class="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-red-800 dark:text-white"
						role="alert"
					>
						<span class="font-medium">Info alert!</span> {error}
					</div>
				)}
				<div className="flex justify-center">
					<div className="flex flex-col w-1/2">
						<h1>Create Post</h1>
						<form
							className="flex flex-col gap-4"
							action={API_URL}
							method="post"
							onSubmit={handleFormSubmit}
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
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export default Create;
