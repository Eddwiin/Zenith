/// <reference types="cypress" />

import BasePO from "./Base_PO";

class SignUpPo extends BasePO {
    navigateToSignUpPage() {
        cy.fixture("config.json").then(data => {
            super.navigate(data.signUpUrl)
        })
    }
}

export default SignUpPo;