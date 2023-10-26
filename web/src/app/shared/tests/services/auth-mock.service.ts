import { UserWithoutId } from "@zenith/core/models/user";
import { AuthService } from "@zenith/core/services/auth/auth.service";
import { of } from "rxjs";

const authServiceMock = {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    checkEmailExists: (email: string) => of(false),
    /* eslint-disable @typescript-eslint/no-unused-vars */
    createAccount: (user: UserWithoutId) => of(true)
} as AuthService


export default authServiceMock;