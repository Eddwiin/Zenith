import { UserWithoutId } from "@zenith/core/models/user";
import { AuthService } from "@zenith/core/services/auth/auth.service";
import { of } from "rxjs";

const authServiceMock = {
    checkEmailExists: (email: string) => of(false),
    createAccount: (user: UserWithoutId) => of(true)
} as AuthService


export default authServiceMock;