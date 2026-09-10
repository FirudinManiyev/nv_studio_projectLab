# Decision Board

Decision Board istifadəçilərə müxtəlif mövzularda qərar verməyə kömək edən sadə və rahat veb tətbiqidir. İstifadəçi yeni qərar yarada, həmin qərara bir neçə seçim əlavə edə və seçimlərdən birini müəyyən edə bilər.

Layihə **Frontend Interview Task** çərçivəsində hazırlanmışdır.

## 🚀 Əsas xüsusiyyətlər

* Yeni qərar yaratmaq
* Qərara bir neçə seçim əlavə etmək
* Minimum 2 seçim tələb olunması
* Eyni seçimlərin əlavə edilməsinin qarşısının alınması
* Mövcud qərarlar arasında keçid etmək
* Seçimlərdən birini seçmək
* Seçilmiş qərarın nəticəsini göstərmək
* Qərarı yenidən seçmək imkanı
* Qərarları silmək
* Silmə əməliyyatından əvvəl təsdiq pəncərəsi
* Məlumatların `localStorage`-da saxlanılması
* Responsive dizayn
* Desktop və mobil cihazlar üçün uyğun interfeys
* Mobil cihazlarda açılan sidebar menyu
* Form validasiyası
* İstifadəçi üçün aydın və sadə UI/UX

## 🛠️ İstifadə olunan texnologiyalar

* **React** – istifadəçi interfeysinin hazırlanması
* **TypeScript** – type-safe kod strukturu
* **Tailwind CSS** – UI dizaynı və responsive stil
* **Vite** – development və build tool
* **Lucide React** – ikonlar
* **LocalStorage** – məlumatların brauzerdə saxlanılması

## 📁 Layihə strukturu

```text
src/
├── components/
│   ├── decisions/
│   │   ├── DecisionCard.tsx
│   │   ├── DecisionForm.tsx
│   │   └── DecisionResult.tsx
│   │
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Sidebar.tsx
│   │
│   └── ui/
│       └── ConfirmDialog.tsx
│
├── data/
│   └── initialDecisions.ts
│
├── hooks/
│   └── useDecisions.ts
│
├── types/
│   └── decision.ts
│
├── App.tsx
├── index.css
└── main.tsx
```

## ⚙️ Quraşdırılması

Layihəni lokal mühitdə işlətmək üçün əvvəlcə repository-ni klonlayın:

```bash
git clone <repository-url>
```

Layihə qovluğuna keçin:

```bash
cd decision-board
```

Lazımi paketləri yükləyin:

```bash
npm install
```

Development server-i başladın:

```bash
npm run dev
```

Daha sonra terminalda göstərilən lokal ünvana daxil olun.

## 💾 Məlumatların saxlanılması

Layihədə backend istifadə olunmur. Qərarlar brauzerin `localStorage` yaddaşında saxlanılır.

Bu yanaşma sayəsində:

* Səhifə yeniləndikdə məlumatlar itməz
* Backend və database tələb olunmur
* Tətbiq sadə frontend həlli kimi işləyir

## 🧠 Texniki yanaşma

Layihədə komponent əsaslı React strukturu istifadə olunmuşdur. UI hissələri daha kiçik və təkrar istifadə edilə bilən komponentlərə bölünmüşdür.

Qərarlarla bağlı state idarəetməsi ayrıca `useDecisions` custom hook-u daxilində saxlanılır.

Məlumat modeli isə TypeScript interface-ləri ilə müəyyən edilmişdir:

* `Decision`
* `DecisionOption`

Form daxilində istifadəçi məlumatlarının düzgünlüyü yoxlanılır. Boş sual və seçimlər qəbul edilmir, həmçinin eyni seçimlərin əlavə edilməsinə icazə verilmir.

## 🔄 Eyni seçimin bir neçə dəfə kliklənməsi

İstifadəçi eyni seçimə bir neçə dəfə klikləsə, nəticə səhv hesablanmır. Çünki tətbiq seçimləri saymır və hər klik üçün ayrıca nəticə yaratmır.

Əvəzində seçilmiş seçimin `id`-si saxlanılır:

```text
selectedOptionId
```

Beləliklə, istifadəçi hansı seçimə neçə dəfə klik etsə də, sistem yalnız həmin seçimin son vəziyyətini nəzərə alır.

`Choose Again` seçildikdə isə `selectedOptionId` sıfırlanır və istifadəçi yenidən seçim edə bilir.

## 📱 Responsive dizayn

Tətbiq müxtəlif ekran ölçülərinə uyğun hazırlanmışdır:

* Desktop
* Tablet
* Mobile

Mobil ekranlarda sidebar menyu açılıb-bağlana bilir və əsas məzmun ekran ölçüsünə uyğun şəkildə dəyişir.

## 🎯 Layihənin məqsədi

Decision Board-un əsas məqsədi istifadəçiyə müxtəlif seçimlər arasından daha rahat qərar vermək üçün sadə, sürətli və istifadəsi rahat interfeys təqdim etməkdir.

Layihədə əsas diqqət:

* Təmiz kod
* Sadə arxitektura
* Responsive UI
* Form validasiyası
* İstifadəçi təcrübəsi
* State idarəetməsi

üzərində cəmlənmişdir.

## 👨‍💻 Müəllif

**Firudin Maniyev**
