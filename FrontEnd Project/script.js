
/* 1. SELECT HTML ELEMENTS*/
const searchInput = document.querySelector(".search-bar input");
const searchButton = document.querySelector(".search-bar button");
const mallCards = document.querySelectorAll(".mall-card");
const wishlistIcon = document.querySelector(".wishlist-icon");

/* 2. WISHLIST STORAGE*/

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

/* 3. UPDATE WISHLIST COUNT*/

function updateWishlistCount() {
    wishlistIcon.innerHTML = `<p>♡ Wishlist (${wishlist.length})</p>`;

}


/* 4. ADD MALLS TO WISHLIST*/

mallCards.forEach(function(card) {
    const mallName = card.querySelector(".mall-name").textContent.trim();
    const mallInfo = card.querySelector(".mall-info");
    const wishlistButton = document.createElement("button");
    wishlistButton.className = "wishlist-toggle";
    wishlistButton.textContent = "♡ Add to Wishlist";
    mallInfo.appendChild(wishlistButton);

 // Check whether mall is already saved

    if (wishlist.includes(mallName)) {
         wishlistButton.textContent = "♥ Added to Wishlist";

    }
    wishlistButton.addEventListener("click", function() {
        if (wishlist.includes(mallName)) {
// Remove mall from wishlist

wishlist = wishlist.filter(function(name) {
                return name !== mallName;
            });

            wishlistButton.textContent = "♡ Add to Wishlist";

        } else {

            // Add mall to wishlist

            wishlist.push(mallName);

            wishlistButton.textContent = "♥ Added to Wishlist";

        }

        // Save wishlist in localStorage

        localStorage.setItem("wishlist", JSON.stringify(wishlist));

        updateWishlistCount();

    });

});


/*5. DISPLAY WISHLIST */
wishlistIcon.addEventListener("click", function() {

    if (wishlist.length === 0) {

        alert("Your wishlist is empty!");

    } else {

        alert("Your Favourite Malls:\n\n" + wishlist.join("\n"));

    }

});


/* 6. SEARCH MALLS */
function searchMalls() {

    const searchValue = searchInput.value.toLowerCase().trim();

    mallCards.forEach(function(card) {

        const mallName = card.querySelector(".mall-name").textContent.toLowerCase();

        const mallLocation = card.querySelector(".mall-location").textContent.toLowerCase();

        if (mallName.includes(searchValue) || mallLocation.includes(searchValue)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}
// Search button click
searchButton.addEventListener("click", searchMalls);

// Search using Enter key
searchInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        searchMalls();
    }

});

/* 7. SURPRISE ME FEATURE*/

const surpriseButton = document.createElement("button");
surpriseButton.textContent = "🎲 Surprise Me";
surpriseButton.className = "hero-btn";
surpriseButton.style.marginLeft = "10px";
document.querySelector(".hero-container").appendChild(surpriseButton);

surpriseButton.addEventListener("click", function() {

    const availableMalls = Array.from(mallCards);

    const randomIndex = Math.floor(Math.random() * availableMalls.length);

    const selectedMall = availableMalls[randomIndex];

    // Show all malls before selecting

    mallCards.forEach(function(card) {
        card.style.display = "block";
    });

    selectedMall.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

    alert("Your next destination is: " +
        selectedMall.querySelector(".mall-name").textContent);
});

/* 8. INITIALIZE WISHLIST*/
updateWishlistCount();
