const domain = "http://192.168.1.10";

export const API_URL = `${domain}/waifupaper/api`;

export const character_path = `${API_URL}/personaje`;
export const list_path = `${API_URL}/lista`;
export const user_path = `${API_URL}/usuario`;
export const image_path = `${API_URL}/imagen`;

export const show_characters = `${list_path}/mostrar_personajes.php`;
export const show_images_for_character = `${list_path}/mostrar_imagenes_por_personaje.php`;
export const show_kinds = `${list_path}/mostrar_especies.php`;
export const show_personalities = `${list_path}/mostrar_personalidades.php`;
export const show_images = `${list_path}/mostrar_imagenes.php`;
export const show_count_total = `${list_path}/mostrar_total.php`;

export const search_character = `${character_path}/buscar_personaje.php`;
export const register_character = `${character_path}/registrar_personaje.php`;
export const assign_personality = `${character_path}/asignar_personalidad.php`;

export const login_user = `${user_path}/iniciar_sesion.php`;

export const search_image = `${image_path}/buscar_imagen.php`;
export const consult_tags = `${image_path}/consultar_etiquetas.php`;