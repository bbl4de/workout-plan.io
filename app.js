const navigation = document.querySelector(".nav-container");

const navigationHeight = navigation.offsetHeight;

document.documentElement.style.setProperty(
	"--scroll-padding",
	navigationHeight + "px"
);

const startDate = new Date("2023-12-03");

let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
	sections.forEach((sec) => {
		let top = window.scrollY;
		let offset = sec.offsetTop;
		let height = sec.offsetHeight;
		let id = sec.getAttribute("id");
		if (top == 0) {
			document.documentElement.style.setProperty(
				"--background-color",
				"rgba(127, 255, 212,0)"
			);
			document.documentElement.style.setProperty("--text-color", "white");
		}
		if (top >= offset && top < offset + height) {
			navLinks.forEach((links) => {
				links.classList.remove("active");
				document
					.querySelector("header nav a[href*=" + id + "]")
					.classList.add("active");
			});
			document.documentElement.style.setProperty(
				"--background-color",
				"rgba(127, 255, 212,0.75)"
			);
			document.documentElement.style.setProperty(
				"--text-color",

				"rgba(29, 29, 31, 1)"
			);
		}
	});
}; // Define the phase and mesocycle system
const phases = [
	"Preparatory",
	"Hypertrophy",
	"Strength",
	"Strength",
	"Power",
	"Rest Week",
];

// Define the mesocycles with phases (each mesocycle is 6 weeks)
const mesocycles = [
	0,
	1,
	2,
	3,
	4,
	5, // Mesocycle 1
	0,
	2,
	2,
	2,
	4,
	5, // Mesocycle 2
	0,
	2,
	2,
	2,
	4,
	5, // Mesocycle 3
];

// Function to get the current phase and mesocycle based on the date
function getCurrentPhaseAndMesocycle(date) {
	// Calculate the number of days since the start date (15th September 2023)
	const currentDate = new Date(date);
	const daysDifference = Math.floor(
		(currentDate - startDate) / (1000 * 60 * 60 * 24)
	);

	// Calculate the current mesocycle and day within the current mesocycle
	const currentMesocycle = Math.floor(daysDifference / 42); // 6 weeks per mesocycle
	const daysWithinCurrentMesocycle = daysDifference % 42;

	// Calculate the current phase based on the day within the current mesocycle
	const currentPhaseIndex =
		mesocycles[currentMesocycle * 6 + daysWithinCurrentMesocycle];
	const currentPhase = phases[currentPhaseIndex];

	return { currentPhase, currentMesocycle };
}
// Rest of your code remains the same...

// Define exercise data for Tuesday/Saturday and Thursday workouts
// Define exercise data for each phase (heavy and light variations)
const exerciseData = {
	Preparatory: {
		Heavy: [
			"4x13s Ring Hang L-sit",
			"3x5s Tuck Planche",
			"3x11-10-9reps Ring Chinups",
			"3x11-10-9reps Ring Chinups",
			"3x10-9-8reps Ring Rows 180deg",
			"3x18reps Pushup + 20kg	",
		],
		Light: [
			"4x14s L-sit",
			"3x9s Planche Lean",
			"3x13-12-11reps Ring Pullup",
			"3x14-13-12reps Pike Pushup",
			"3x13-12-11reps Ring Wide Rows",
			"3x15reps Slow Diamond Pushup",
		],
	},
	Hypertrophy: {
		Heavy: [
			"4x11s Ring Hang L-sit",
			"5x3s Tuck Planche	",
			"5x10reps Ring Chinups",
			"5x10reps Dips",
			"5x9reps Ring Rows",
			"5x15 Pushup + 20kg",
		],
		Light: [
			"4x12s L-sit",
			"5x7s Planche Lean",
			"5x12reps Ring Pullup",
			"5x12reps Pike Pushup",
			"5x12reps Ring Wide Rows",
			"5x15 Diamond Pushup",
		],
	},
	Strength: {
		Heavy: [
			"7x3s V-sit 40deg",
			"5x5s Tuck Planche",
			"3x6-5-4reps Ring Pullup + 16kg",
			"3x5reps Ring Dip",
			"3x4reps Ring FL one leg Press",
			"3x9-8-7reps Planche Lean PSHP",
		],
		Light: [
			"4x14s L-sit",
			"5x9s Planche Lean",
			"3x-2--3--4reps Ring Chinup + 16kg",
			"3x13-12-11reps Pike Pushup",
			"3x11-10-9reps Ring Rows 180deg",
			"3x13-12-11reps Reverse PSHP",
		],
	},
	Power: {
		Heavy: ["Heavy Exercise J", "Heavy Exercise K", "Heavy Exercise L"],
		Light: ["Light Exercise J", "Light Exercise K", "Light Exercise L"],
	},
	Rest: {
		Heavy: ["Rest and Recovery"],
		Light: ["Rest and Recovery"],
	},
};

// Function to get the current day of the week
function getCurrentDayOfWeek() {
	const daysOfWeek = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	const currentDate = new Date();
	const dayOfWeek = daysOfWeek[currentDate.getDay()];
	return dayOfWeek;
}
function displayExercises() {
	const currentDate = new Date();
	const dayOfWeek = getCurrentDayOfWeek();
	const { currentPhase, currentMesocycle } =
		getCurrentPhaseAndMesocycle(currentDate);

	// Display the current phase and mesocycle
	const currentPhaseElement = document.getElementById("currentPhase");
	const currentMesocycleElement = document.getElementById("currentMesocycle");
	const startDateElement = document.getElementById("startDate");

	startDateElement.textContent = `Start Date: ${startDate.toLocaleDateString(
		"en-US",
		{
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		}
	)}`;

	// Check if the starting date is in the future
	if (currentDate < startDate) {
		// Calculate the number of days until the starting date
		const daysUntilStart = Math.floor(
			(startDate - currentDate) / (1000 * 60 * 60 * 24)
		);

		// Display the message in the exercise section
		const exerciseListContainer = document.getElementById("exerciseList");
		console.log(startDate - currentDate, daysUntilStart);
		if (daysUntilStart == 1) {
			currentPhaseElement.textContent = `Phase: Training begins in ${daysUntilStart} day`;
			currentMesocycleElement.textContent = `Mesocycle: Training begins in ${daysUntilStart} day`;
			exerciseListContainer.innerHTML = `<p>Training plan begins in ${daysUntilStart} day</p>`;
		} else if (startDate - currentDate >= 0) {
			currentPhaseElement.textContent = `Phase: Training begins in less than 1 day`;
			currentMesocycleElement.textContent = `Mesocycle: Training begins in less than 1 day`;
			exerciseListContainer.innerHTML = `<p>Training plan begins in less than 1 day</p>`;
		} else {
			currentPhaseElement.textContent = `Phase: Training begins in ${daysUntilStart} days`;
			currentMesocycleElement.textContent = `Mesocycle: Training begins in ${daysUntilStart} days`;
			exerciseListContainer.innerHTML = `<p>Training plan begins in ${daysUntilStart} days</p>`;
		}
	} else {
		// Define exercises based on the day of the week and phase (heavy or light)
		let currentExercises;
		currentPhaseElement.textContent = `Phase: ${currentPhase}`;
		currentMesocycleElement.textContent = `Mesocycle: ${currentMesocycle + 1}`;
		if (dayOfWeek === "Tuesday" || dayOfWeek === "Saturday" || dayOfWeek === "Sunday") {
			currentExercises = exerciseData[currentPhase].Heavy;
		} else if (dayOfWeek === "Thursday") {
			currentExercises = exerciseData[currentPhase].Light;
		} else {
			currentExercises = ["Rest Day"];
		}

		// Display exercises in the exerciseListContainer
		const exerciseListContainer = document.getElementById("exerciseList");
		exerciseListContainer.innerHTML = "";

		if (currentExercises) {
			const exerciseHTML = currentExercises
				.map((exercise, index) => {
					return `<div class="check-and-ex"><input type="checkbox"><p> ${exercise}</p></div>`;
				})
				.join("");
			exerciseListContainer.innerHTML = exerciseHTML;
		}
	}
}

// Initial display of exercises
displayExercises();

// Initial display of exercises
displayExercises();
