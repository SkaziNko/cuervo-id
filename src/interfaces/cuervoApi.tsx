export interface UserResponse {
    id_user:        string | number;
    nombre:         string;
    ap_paterno:     string;
    ap_materno:     string;
    image:          string;
    userKey:        string;
    carrera:        string;
    password:       string;
    type_user:      string;
}


export type RequestLogin = UserResponse | false;