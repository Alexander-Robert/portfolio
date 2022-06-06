const stateMachine = createMachine({
    initialState: 'design',
    state: initialState,
    transition: {
        switch(state) {
            console.log('transition from ' + stateMachine.state + 'to' + state);
            stateMachine.state.actions.onExit();
            stateMachine.state = state;
            stateMachine.state.actions.onEnter();
        },
    },
    design: {
        actions: {
            onEnter() {
                console.log('design: onEnter');
            },
            onExit() {
                console.log('design: onExit');
            },
        },
    },
    code: {
        actions: {
            onEnter() {
                console.log('code: onEnter');
            },
            onExit() {
                console.log('code: onExit');
            },
        },
    },
    learn: {
        actions: {
            onEnter() {
                console.log('learn: onEnter');
            },
            onExit() {
                console.log('learn: onExit');
            },
        },
    },
})

function createMachine(stateMachineDefinition) {
    const machine = {
        value: stateMachineDefinition.initialState,
        transition(currentState, event) {
            const currentStateDefinition = stateMachineDefinition[currentState]
            const destinationTransition = currentStateDefinition.transition[event]
            if(!destinationTransition) return;

            return machine.value;
        }
    }
    return machine;
}

function addGlobalEventListener(type, selector, callback) {
    document.addEventListener(type, e => {
        if (e.target.matches(selector)) callback(e)
    })
}

function toggleDisplayElement(initialClass, replacementClass, elements = null) {
    if (elements == null) 
        elements = document.getElementsByClassName(initialClass);
    for (var i in elements) {
        if (elements.hasOwnProperty(i)) {
            elements[i].className = replacementClass;
        }
    }
}

addGlobalEventListener("click",'img', e => {
    if (e.target.classList.contains('design-icon')) {
        console.log("design clicked");
        design = document.getElementById('design');
        for (var i in design) {
            if (design.hasOwnProperty('hidden-class'))
                design[i].classList.className = 'show-class';
        }

    }
    if (e.target.classList.contains('code-icon')) {
        console.log("code clicked");
    }
    if (e.target.classList.contains('lightbulb-icon')) {
        console.log("learn clicked");
    }
    console.log(document);
});

addGlobalEventListener("click",'document', e => {
    
});

console.log("test");