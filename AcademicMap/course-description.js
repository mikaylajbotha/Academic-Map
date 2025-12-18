document.addEventListener('DOMContentLoaded', () => {
    const descriptionElement = document.getElementById('course-description');
    const params = new URLSearchParams(window.location.search);
    const courseCode = params.get('course');

    if (!courseCode) {
        descriptionElement.innerHTML = 'No course specified.';
        return;
    }

    async function fetchCourseData() {
        try {
            const response = await fetch('coursedata.txt');

            if (!response.ok) throw new Error('Network response was not ok.');
            return await response.json();
        } catch (error) {
            console.error('Failed to fetch course data:', error);
            descriptionElement.innerHTML = 'Failed to load course data.';
            return [];
        }
    }

    function updateDescription(course) {
        if (!course) {
            descriptionElement.innerHTML = 'Course description not available.';
            return;
        }

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

    async function init() {
        const courses = await fetchCourseData();
        if (courses.length === 0) return;

        const sanitizedCourseCode = courseCode.trim().toUpperCase();
        const course = courses.find(c => c.courseNum === sanitizedCourseCode);
        updateDescription(course);
    }

    init();
});
