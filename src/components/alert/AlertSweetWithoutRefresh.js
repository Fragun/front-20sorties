import Swal from 'sweetalert2';

export default function AlertSweetWithoutRefresh(title, text){
    Swal.fire({
        title: title,
        text: text,
        imageUrl: '../assets/images/emojiCook.png',
        confirmButtonText: 'Ok',
        allowOutsideClick: false // Empêche la fermeture de l'alerte en cliquant à l'extérieur
      })
    };
