document.addEventListener("DOMContentLoaded", function () {
    const jsonData = "notifications.json";
    fetch(jsonData)
        .then((response) => response.json())
        .then((data) => {
            loadSections(data.sections);        })
        .catch((error) => console.error("Error loading JSON data:", error));

    function loadSections(sections) {
        const sectionsContainer = document.getElementById("sectionsContainer");
        sections.forEach((section) => {
            const sectionDiv = document.createElement("div");
            sectionDiv.classList.add("notification-section", "mt-4");
            sectionDiv.innerHTML = `
                <h3>${section.title}</h3>
                <div id="${section.id}" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner" id="${section.id}Inner"></div>
                    <a class="carousel-control-prev" href="#${section.id}" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#${section.id}" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
            `;
            sectionsContainer.appendChild(sectionDiv);
            loadNotifications(section.notifications, `${section.id}Inner`); // Load notifications for this section
        });
    }

    function loadNotifications(notifications, carouselInnerId) {
        const carouselInner = document.getElementById(carouselInnerId);
        notifications.forEach((notification, index) => {
            const card = `
                <div class="carousel-item ${index === 0 ? "active" : ""}">
                    <div class="card notification-card">
                        <img src="${notification.image}" class="card-img-top" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title">${notification.title}</h5>
                            <p class="card-text">${notification.description}</p>
                            <a href="${notification.link}" class="btn btn-link" target="_blank">Learn More</a>
                        </div>
                    </div>
                </div>`;
            carouselInner.innerHTML += card;
        });
    }
});