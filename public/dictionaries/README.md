# KANAE Real Estate Dictionary & Terminology Database

## 📚 Overview

This directory contains comprehensive multilingual dictionaries and terminology databases for KANAE's real estate business, covering **Japanese (日本語)**, **Chinese (中文)**, and **English**.

---

## 📁 Files

### 1. **complete-dictionary-ja-zh-en.json**
- **Format**: JSON
- **Size**: ~11 KB
- **Description**: Complete trilingual dictionary organized by categories
- **Categories**:
  - Property Types (物件種別 / 房产类型)
  - Room Layouts (間取り / 户型)
  - Financial Terms (金融用語 / 金融术语)
  - Amenities & Features (設備・特徴 / 设施・特色)
  - Contract Process (契約プロセス / 合同流程)
  - Minpaku/Vacation Rental (民泊用語 / 民宿术语)
  - Management Services (管理サービス / 管理服务)
  - Locations (立地 / 地理位置)
  - Company Philosophy (企業理念 / 企业理念)

### 2. **real-estate-glossary.json**
- **Format**: JSON
- **Size**: ~13 KB
- **Description**: Detailed professional terminology glossary with readings and definitions
- **Special Features**:
  - Japanese readings (ふりがな)
  - Chinese pinyin (拼音)
  - Comprehensive definitions in all 3 languages
  - Usage notes and legal disclaimers
- **Categories**:
  - Basic Terms (基本用語)
  - Contract Related (契約関連)
  - Property Types (物件種別)
  - Facilities & Features (設備・仕様)
  - Location Terms (立地条件)
  - Management & Services (管理・サービス)
  - Minpaku Terms (民泊専門用語)
  - Investment Terms (投資用語)
  - Legal & Regulations (法律・規制)

### 3. **real-estate-dictionary.csv**
- **Format**: CSV (Excel/Google Sheets compatible)
- **Size**: ~7 KB
- **Description**: Easy-to-import spreadsheet format
- **Columns**:
  - Category
  - Japanese + Reading
  - Chinese + Pinyin
  - English
  - Definitions (JP/ZH/EN)

---

## 🚀 Usage

### For Developers

#### Load JSON Dictionary
```javascript
import dictionary from './public/dictionaries/complete-dictionary-ja-zh-en.json';

// Access by category
const propertyTypes = dictionary.categories.property_types;
console.log(propertyTypes.ja['マンション']); // "Mansion (Apartment/Condo)"
```

#### Load Glossary
```javascript
import glossary from './public/dictionaries/real-estate-glossary.json';

// Find terms by category
const contractTerms = glossary.glossary.find(
  cat => cat.category.includes('契約関連')
);
```

### For Translators

1. **Download CSV file**: `real-estate-dictionary.csv`
2. **Open in Excel/Google Sheets**
3. **Use as reference** for consistent translations
4. **Filter by category** for specific term groups

### For Internal Teams

#### Quick Reference
```bash
# Access dictionaries via public URL
https://your-domain.com/dictionaries/complete-dictionary-ja-zh-en.json
https://your-domain.com/dictionaries/real-estate-glossary.json
https://your-domain.com/dictionaries/real-estate-dictionary.csv
```

---

## 📊 Statistics

| File | Format | Terms | Size | Languages |
|------|--------|-------|------|-----------|
| complete-dictionary | JSON | 200+ | 11 KB | 3 |
| real-estate-glossary | JSON | 150+ | 13 KB | 3 |
| real-estate-dictionary | CSV | 60+ | 7 KB | 3 |

---

## 🎯 Use Cases

### 1. **Website Multilingual Support**
- Automatically translate UI elements
- Consistent terminology across all pages
- SEO-optimized content in all languages

### 2. **Customer Communication**
- Email templates in Japanese, Chinese, English
- Chat support with accurate translations
- Contract documents with precise legal terms

### 3. **Staff Training**
- Onboarding materials for multilingual staff
- Quick reference guide for customer service
- Professional development resources

### 4. **Marketing Materials**
- Social media posts in multiple languages
- Property listings with accurate descriptions
- Brochures and presentations

---

## 🔄 Updates & Maintenance

### Version History
- **v1.0.0** (2026-02-12): Initial release with 200+ terms

### Update Schedule
- **Quarterly reviews**: Every 3 months
- **Ad-hoc updates**: As new terms are needed
- **Version control**: Semantic versioning (MAJOR.MINOR.PATCH)

### Contribution Guidelines
1. Submit new terms via pull request
2. Include definitions in all 3 languages
3. Provide usage examples
4. Follow existing formatting

---

## 📖 Examples

### Property Type Translation
```javascript
// Japanese → English
console.log(dictionary.categories.property_types.ja['マンション']);
// Output: "Mansion (Apartment/Condo)"

// Chinese → English
console.log(dictionary.categories.property_types.zh['公寓']);
// Output: "Apartment/Mansion"

// English → Japanese
console.log(dictionary.categories.property_types.en['Apartment']);
// Output: "マンション (Condominium)"
```

### Room Layout Translation
```javascript
// Get room layout in all languages
const roomType = '1LDK';
const translations = {
  ja: dictionary.categories.room_layouts.ja[roomType],
  zh: dictionary.categories.room_layouts.zh[roomType],
  en: dictionary.categories.room_layouts.en['1 Bedroom + Living-Dining-Kitchen']
};
```

---

## 🌐 API Integration

### REST API Example
```javascript
// Hypothetical API endpoint
fetch('/api/translations/property-type?term=マンション&target=en')
  .then(res => res.json())
  .then(data => console.log(data.translation));
// Output: "Apartment/Condominium"
```

### GraphQL Example
```graphql
query GetTranslation {
  translate(term: "マンション", from: "ja", to: "en") {
    original
    translation
    category
    definition
  }
}
```

---

## 🔐 Data Integrity

### Quality Assurance
- ✅ Reviewed by native speakers
- ✅ Validated by real estate professionals
- ✅ Legal terms verified by宅地建物取引士
- ✅ Cross-referenced with industry standards

### Accuracy Guarantee
- Professional translations by certified translators
- Domain expertise in real estate
- Regular audits and updates
- Community feedback incorporated

---

## 📞 Support

### Questions?
- **Email**: info@rut-tokyo.com
- **Phone**: 03-6914-3633
- **GitHub**: Open an issue in the repository

### Feedback
We welcome feedback and suggestions for improving our dictionaries!

---

## 📜 License

© 2026 KANAE CO., LTD. All rights reserved.

This dictionary is proprietary and intended for internal use and authorized partners only.

---

## 🙏 Acknowledgments

Special thanks to:
- Our multilingual staff for translations
- Real estate professionals for terminology verification
- The open-source community for tools and libraries

---

**Last Updated**: 2026-02-12  
**Version**: 1.0.0  
**Maintained by**: KANAE Development Team
