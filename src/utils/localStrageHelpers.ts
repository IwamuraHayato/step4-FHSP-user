// キャラクター画像の保存キー
const CHARACTER_IMAGE_KEY = 'customCharacterImage';

// 画像を保存する（Base64など）
export function saveCustomCharacterImage(base64: string) {
  localStorage.setItem(CHARACTER_IMAGE_KEY, base64);
}

// 保存した画像を取得する
export function getCustomCharacterImage(): string | null {
  return localStorage.getItem(CHARACTER_IMAGE_KEY);
}

// 削除する（初期化用）
export function removeCustomCharacterImage() {
  localStorage.removeItem(CHARACTER_IMAGE_KEY);
}
