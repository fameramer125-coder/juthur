# Unified Design System — د. عادل ف. عامر

نظام تصميم واحد يغطّي **كل أعمالك**، لا جُذور وحدها: الكتب، هَب الأوراق البحثية، مواد ASD الإدارية، المحاضرات، وأوراق شرح الطلبة. مكتبة مكوّنات واحدة، وثلاث سمات (themes) يُختار بينها حسب الجمهور — لا حسب المشروع.

## السمات الثلاث (`src/tokens/themes.js`)
| السمة | الاستخدام | الألوان |
|---|---|---|
| **juthurCore** (افتراضي) | كتب جُذور، الموقع، أي مادّة تحمل هوية جُذور | INK `#1B3A2F` · GOLD `#9A7B23` · Paper `#FBF9F4` |
| **academicNeutral** | الأوراق البحثية المحكَّمة، هَب الأوراق البحثية، مؤتمرات | حبر محايد `#1A1A1A` على أبيض، لمسة INK واحدة كتمييز |
| **asdInstitutional** | مستندات القسم، المحاضرات، أوراق عمل الطلبة | لون مؤسّسي (عدِّله ليطابق دليل هوية ASD الرسمي إن توفَّر) |

## المكوّنات (تعمل مع أي سمة عبر `theme="..."`)
- `Button` — `<Button theme="academicNeutral">حفظ</Button>`
- `ArabicHeading` — عنوان عربي RTL، يحترم قاعدة سطر ≥ ٢.٠ مع التشكيل تلقائيًّا.
- `Card` — بطاقة محتوى.

## مثال
```jsx
import { Button, ArabicHeading, Card } from "juthur-design-system";

<Card theme="asdInstitutional">
  <ArabicHeading theme="asdInstitutional">اجتماع القسم</ArabicHeading>
  <Button theme="asdInstitutional">تأكيد</Button>
</Card>
```

## قاعدة حاكمة
لا تُخلَق ألوان أو خطوط جديدة خارج هذا الملف لأي مشروع من مشاريعك — كل مادة بصرية جديدة (شريحة محاضرة، ورقة عمل، غلاف) تختار إحدى السمات الثلاث وتُبنى عليها. هذا يمنع تكرار قرارات التصميم يدويًّا في كل ملف منفصل.

## الربط بـClaude Design
```bash
cd ~/claude-247/juthur-design-system
claude
```
ثم داخل الجلسة، اكتب بنفسك:
```
/design-sync
```

أو الصق رابط GitHub مباشرة في حقل "Link code from GitHub":
```
https://github.com/fameramer125-coder/juthur/tree/design-system-juthur
```
