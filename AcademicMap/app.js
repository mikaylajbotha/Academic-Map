document.addEventListener('DOMContentLoaded', () => {
    const courseDataPath = 'coursedata.txt';

    async function fetchCourseData() {
        try {
            const response = await fetch(courseDataPath);
            if (!response.ok) throw new Error('Network response was not ok.');
            return await response.json();
        } catch (error) {
            console.error('Failed to fetch course data:', error);
            return [];
        }
    }

    async function init() {
        const courses = await fetchCourseData();
        if (courses.length === 0) return;

        document.querySelector('.container').addEventListener('click', event => {
            const target = event.target.closest('.course-link');
            if (target) {
                const courseCode = target.getAttribute('data-course');
                if (courseCode) {
                    const url = new URL('course-description.html', window.location.origin);
                    url.searchParams.append('course', courseCode.trim().toUpperCase());
                    window.open(url, '_blank');
                } else {
                    console.error('No course code found in clicked element.');
                }
            }
        });
    }

    init();
});
