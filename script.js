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
                    <ol class="carousel-indicators" id="carouse-indicator-${section.id}">
                    </ol>
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
            loadNotifications(section.notifications, `${section.id}`, `${section.id}Inner`, `carouse-indicator-${section.id}`); // Load notifications for this section
        });
    }

    function loadNotifications(notifications, sectionId, carouselInnerId, carouselIndicatorId) {
        const carouselInner = document.getElementById(carouselInnerId);
        const carouselIndicatorList = document.getElementById(carouselIndicatorId);
        notifications.forEach((notification, index) => {
            const card = `
                <div class="carousel-item ${index === 0 ? "active" : ""}">
                    <div class="card notification-card">
                        <div class="card-details">
                            <img src="${notification.image}" class="card-img-top" alt="..."/>
                            <div class="card-body">
                                <h5 class="card-title">${notification.title}</h5>
                                <p class="card-text">${notification.description}</p>
                            </div>
                        </div>
                        <a href="${notification.link}" class="btn btn-link mb-4" target="_blank">Learn More</a>
                    </div>
                </div>`;
            carouselInner.innerHTML += card;

            const li = `<li data-target="${sectionId}" data-slide-to=""${index + 1} class="${index === 0 ? "active" : ""}"></li>`
            carouselIndicatorList.innerHTML += li;
        });
    }
});