function registerTabs() {
    let tabspans = document.querySelectorAll("div.tab");
    
    let tabToggler = function() {
        for(let i = 0; i < tabspans.length; i++) {
            if(this == tabspans[i]) {
                tabspans[i].classList.add("selected");
                document.querySelector("#" + tabspans[i].getAttribute("data-div")).classList.remove("hidden");
            } else {
                tabspans[i].classList.remove("selected");
                document.querySelector("#" + tabspans[i].getAttribute("data-div")).classList.add("hidden");
            }
        }
    };
    
    for(let i = 0; i < tabspans.length; i++) {
        tabspans[i].addEventListener("click", tabToggler);
    }    
}

function registerButtons() {
    let addMealAddSavedMeal = function() {
        let selectedMeal = document.querySelector("select#addMealSavedMeals");
        let kcal = Number(selectedMeal.options[selectedMeal.selectedIndex].getAttribute("data-kcal"));
        let name = selectedMeal.options[selectedMeal.selectedIndex].getAttribute("data-name");
        document.querySelector("#addMealDescription").value += name + ", ";
        document.querySelector("#addMealTotalKcal").value = Number(document.querySelector("#addMealTotalKcal").value) + kcal;
    };

    document.getElementById("addMealAddSavedMealBtn").addEventListener("click", addMealAddSavedMeal);

    let addMealAddSavedIngredient = function() {
        let selectedMeal = document.querySelector("#addMealSavedIngredients");
        let kcal = Number(selectedMeal.options[selectedMeal.selectedIndex].getAttribute("data-kcal"));
        let amount = Number(document.querySelector("#addMealAddSavedIngredientAmount").value);
        kcal = Math.ceil((amount / 100) * kcal);

        let name = selectedMeal.options[selectedMeal.selectedIndex].getAttribute("data-name");
        document.querySelector("#addMealDescription").value += `${name} (${amount}g/ml), `;
        document.querySelector("#addMealTotalKcal").value = Number(document.querySelector("#addMealTotalKcal").value) + kcal;
    };

    document.getElementById("addMealAddSavedIngredientBtn").addEventListener("click", addMealAddSavedIngredient);

    let addSavedMealAddSavedIngredient = function() {
        let selectedMeal = document.querySelector("#addSavedMealFromIngr");
        let kcal = Number(selectedMeal.options[selectedMeal.selectedIndex].getAttribute("data-kcal"));
        let amount = Number(document.querySelector("#addSavedMealAddSavedIngredientAmount").value);
        kcal = Math.ceil((amount / 100) * kcal);

        let name = selectedMeal.options[selectedMeal.selectedIndex].getAttribute("data-name");
        document.querySelector("#addSavedMealFromIngrName").value += `${name} (${amount}g/ml), `;
        document.querySelector("#addSavedMealFromIngrTotalKcal").value = Number(document.querySelector("#addSavedMealFromIngrTotalKcal").value) + kcal;
    };

    document.getElementById("addSavedMealAddSavedIngredientBtn").addEventListener("click", addSavedMealAddSavedIngredient);

    let deleteEntry = function() {
        let src = this.getAttribute("data-src");
        let id = this.getAttribute("data-id");
        let name = this.getAttribute("data-name");

        let noun = "log entry";
        if(src == "meals") {
            noun = "meal";
        } else if(src == "ingredients") {
            noun = "ingredient";
        }

        if(confirm(`Are you sure you want to delete the ${noun} "${name}"?`)) {
            document.location.href = `./?delete=${id}&from=${src}`;
        }
    };

    let deleteButtons = document.querySelectorAll("span.delBtn");
    for(let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", deleteEntry);
        deleteButtons[i].title = "Delete";
    }

    let editEntry = function() {
        let src = this.getAttribute("data-src");
        let id = this.getAttribute("data-id");
        let name = this.getAttribute("data-name");
        let kcal = Number(this.getAttribute("data-kcal"));

        if(src == "log") {
            document.querySelector("#hiddenEditLogIDField").value = id;
            document.querySelector("#editLogDescription").value = name;
            document.querySelector("#editLogKcal").value = kcal;

            document.querySelector("#editLogDialog").showModal();
        } else {
            let noun = "";
            if(src == "meals") {
                noun = "meal";
                document.querySelector("#editMealIngredientKcalLabel").innerText = "Kcal:";
            } else if(src == "ingredients") {
                noun = "ingredient";
                document.querySelector("#editMealIngredientKcalLabel").innerText = "Kcal per 100g/ml:";
            }

            document.querySelector("#hiddenEditField").value = noun;
            document.querySelector("#hiddenEditIDField").value = id;
            
            document.querySelector("#editMealIngredientDialogHeader").innerText = "Edit " + noun;
            document.querySelector("#editMealIngredientDescriptionLabel").innerText = noun.charAt(0).toUpperCase() + noun.slice(1) + " name:";
            
            document.querySelector("#editMealIngredientName").value = name;
            document.querySelector("#editMealIngredientName").placeholder = noun.charAt(0).toUpperCase() + noun.slice(1) + " name";
            document.querySelector("#editMealIngredientKcal").value = kcal;

            document.querySelector("#editMealIngredientDialog").showModal();
        }
    };

    let editButtons = document.querySelectorAll("span.editBtn");
    for(let i = 0; i < editButtons.length; i++) {
        editButtons[i].addEventListener("click", editEntry);
        editButtons[i].title = "Edit";
    }
}

function initialChangeTab() {
    let params = new URLSearchParams(document.location.search);

    if(params.get("t")) {
        if(params.get("t") == "log") {
            document.querySelector("#logMealTab").click();
        } else if(params.get("t") == "meals") {
            document.querySelector("#savedMealsTab").click();
        } else if(params.get("t") == "ingredients") {
            document.querySelector("#savedIngredientsTab").click();
        }
    }
}