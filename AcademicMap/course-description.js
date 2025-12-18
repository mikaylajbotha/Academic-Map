// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Get the container element where course description will be displayed
    const descriptionElement = document.getElementById('course-description');
    // Parse URL query parameters
    const params = new URLSearchParams(window.location.search);
    // Get the 'course' parameter from the URL
    const courseCode = params.get('course');

    // If no course code is provided in the URL, show a message and stop execution
    if (!courseCode) {
        descriptionElement.innerHTML = 'No course specified.';
        return;
    }

    // Async function to fetch course data from the file
    async function fetchCourseData() {
        try {
            // Fetch the course data file
            const response = await fetch('coursedata.txt');
            // Throw an error if response is not OK
            if (!response.ok) throw new Error('Network response was not ok.');
            // Parse and return the JSON data
            return await response.json();
        } catch (error) {
            // Log the error to the console
            console.error('Failed to fetch course data:', error);
            // Display an error message in the page
            descriptionElement.innerHTML = 'Failed to load course data.';
            // Return an empty array as fallback
            return [];
        }
    }

    // Function to update the course description in the DOM
    function updateDescription(course) {
        // If no course is found, display a fallback message
        if (!course) {
            descriptionElement.innerHTML = 'Course description not available.';
            return;
        }

        // Populate the description element with course details
        descriptionElement.innerHTML = `
            <strong>${course.title}</strong><br>
            ${course.description}<br><br>
            <strong>Credit Hours:</strong> ${course.creditHours}<br>
            <strong>Lecture Contact Hours:</strong> ${course.lectureContactHours}<br>
            <strong>Lab Contact Hours:</strong> ${course.labContactHours}<br>
            <strong>Prerequisite:</strong> ${course.prerequisite || 'None'}<br>
            <strong>Repeatability:</strong> ${course.repeatability}<br>
            <strong>Note:</strong> ${course.note || 'None'}<br>
            <strong>TCCNS Equivalent:</strong> ${course.tccns || 'None'}<br>
            <strong>Additional Fee:</strong> ${course.additionalFee || 'None'}
        `;
    }

    // Initialize the page
    async function init() {
        // Fetch all courses
        const courses = await fetchCourseData();
        // Stop if no courses are loaded
        if (courses.length === 0) return;

        // Sanitize and normalize the course code from URL
        const sanitizedCourseCode = courseCode.trim().toUpperCase();
        // Find the course in the data that matches the sanitized code
        const course = courses.find(c => c.courseNum === sanitizedCourseCode);
        // Update the page with the course description
        updateDescription(course);
    }

    // Call the init function to start the process
    init();
});
