<?php
/* ==========================================================================
   Brandini — envoi du formulaire de contact
   Sur Hostinger : crée d'abord la boîte mail contact@brandini.pro
   (hPanel > Emails), sinon les messages risquent de partir en spam.
   ========================================================================== */

$TO   = 'contact@brandini.pro';   // où arrivent les demandes
$FROM = 'contact@brandini.pro';   // doit être une adresse @brandini.pro

header('Content-Type: application/json; charset=utf-8');

function done($ok, $code = 200) {
    http_response_code($code);
    echo json_encode(['ok' => $ok]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') done(false, 405);

// Anti-spam : le champ caché "website" doit rester vide
if (!empty($_POST['website'])) done(true);

function clean($v, $max = 2000) {
    $v = trim((string) $v);
    $v = str_replace(["\r", "\0"], '', $v);
    return mb_substr($v, 0, $max);
}

$name    = clean($_POST['name'] ?? '', 120);
$email   = clean($_POST['email'] ?? '', 200);
$company = clean($_POST['company'] ?? '', 200);
$budget  = clean($_POST['budget'] ?? '', 50);
$message = clean($_POST['message'] ?? '', 8000);
$lang    = clean($_POST['lang'] ?? 'fr', 2);
$needs   = isset($_POST['needs']) && is_array($_POST['needs'])
    ? implode(', ', array_map(fn($n) => clean($n, 50), $_POST['needs']))
    : '';

if ($name === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    done(false, 422);
}

// Empêche l'injection d'en-têtes
$name = str_replace("\n", ' ', $name);

$subject = 'Nouveau projet — ' . $name . ($company ? " ($company)" : '');
$body  = "Nouvelle demande depuis brandini.pro\n";
$body .= "------------------------------------\n\n";
$body .= "Nom : $name\n";
$body .= "E-mail : $email\n";
$body .= "Entreprise : " . ($company ?: '-') . "\n";
$body .= "Budget : " . ($budget ?: '-') . "\n";
$body .= "Besoins : " . ($needs ?: '-') . "\n";
$body .= "Langue : $lang\n\n";
$body .= "Message :\n$message\n";

$headers  = "From: Brandini <$FROM>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$sent = mail($TO, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, $headers, '-f' . $FROM);

done($sent, $sent ? 200 : 500);
