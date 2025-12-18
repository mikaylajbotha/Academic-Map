// Wait until the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Path to the course data file (JSON expected)
    const courseDataPath = 'coursedata.txt';

    // Async function to fetch course data from the file
    async function fetchCourseData() {
        try {
            // Fetch the data from the specified path
            const response = await fetch(courseDataPath);
            // Throw an error if the response is not OK
            if (!response.ok) throw new Error('Network response was not ok.');
            // Parse and return the JSON data
            return await response.json();
        } catch (error) {
            // Log any errors and return an empty array as a fallback
            console.error('Failed to fetch course data:', error);
            return [];
        }
    }

    // Initialize the page functionality
    async function init() {
        // Fetch courses asynchronously
        const courses = await fetchCourseData();
        // Exit if no courses are loaded
        if (courses.length === 0) return;

        // Add a click event listener to the main container
        // This uses event delegation for dynamically generated course links
        document.querySelector('.container').addEventListener('click', event => {
            // Check if the clicked element or its parent has the class 'course-link'
            const target = event.target.closest('.course-link');
            if (target) {
                // Get the course code from the data-course attribute
                const courseCode = target.getAttribute('data-course');
                if (courseCode) {
                    // Build the URL for the course-description page with the course query parameter
                    const url = new URL('course-description.html', window.location.origin);
                    url.searchParams.append('course', courseCode.trim().toUpperCase());
                    // Open the course description page in a new tab
                    window.open(url, '_blank');
                } else {
                    // Log an error if the clicked element has no course code
                    console.error('No course code found in clicked element.');
                }
            }
        });
    }

    // Call the init function to set everything up
    init();
});
