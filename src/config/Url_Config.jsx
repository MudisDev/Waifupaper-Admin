const domain = "http://localhost";

export const API_URL = `${domain}/waifupaper/api`;

export const character_path = `${API_URL}/personaje`;
export const list_path = `${API_URL}/lista`;
export const user_path = `${API_URL}/usuario`;
export const image_path = `${API_URL}/imagen`;
export const transaction_path = `${API_URL}/transacciones`;

export const show_characters = `${list_path}/mostrar_personajes.php`;
export const show_images_for_character = `${list_path}/mostrar_imagenes_por_personaje.php`;
export const show_kinds = `${list_path}/mostrar_especies.php`;
export const show_personalities = `${list_path}/mostrar_personalidades.php`;
export const show_images = `${list_path}/mostrar_imagenes.php`;
export const show_count_total = `${list_path}/mostrar_total.php`;
export const show_base_models = `${list_path}/mostrar_modelos_base.php`;
export const show_lora_models = `${list_path}/mostrar_modelos_lora.php`;
export const show_lora_models_for_image = `${list_path}/mostrar_modelos_lora_por_imagen.php`;
export const show_characters_for_image = `${list_path}/mostrar_personajes_por_imagen.php`;
export const show_tags = `${list_path}/mostrar_etiquetas.php`;
export const show_personalities_for_character = `${list_path}/mostrar_personalidades_por_personaje.php`;

export const search_character = `${character_path}/buscar_personaje.php`;
export const register_character = `${character_path}/registrar_personaje.php`;
export const assign_personality = `${character_path}/asignar_personalidad.php`;
export const edit_profile = `${character_path}/editar_perfil.php`;

export const login_user = `${user_path}/iniciar_sesion.php`;

export const search_image = `${image_path}/buscar_imagen.php`;
export const search_view_image = `${image_path}/buscar_imagen_vista.php`;
export const consult_tags = `${image_path}/consultar_etiquetas.php`;
export const edit_image = `${image_path}/editar_imagen.php`;
//export const show_characters_for_image = `${image_path}/mostrar_personajes.php`;

export const edit_wallpaper = `${transaction_path}/editar_wallpaper.php`;
export const add_character = `${transaction_path}/agregar_personaje.php`;
export const edit_character = `${transaction_path}/editar_personaje.php`;

export const image_server = `https://mudisdev.com/waifupaper/src/php/api/gestor_imagenes/subir_imagen.php`;
