import { AuthService } from "@zenith/core/services/auth/auth.service";
import { of } from "rxjs";

const authServiceMock = {
    checkEmailExists: (email: string) => of(false)
} as AuthService


export default authServiceMock;