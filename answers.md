1. POST ба PATCH-ийн ялгаа юу вэ?

POST нь шинээр үүсгэдэг, PATCH нь байгааг хэсэгчлэн засдаг. POST нь /books руу id-гүй илгээгддэг, учир нь id-г server өгдөг; амжилттай бол 201 буцаана. PATCH нь /books/:id руу илгээгддэг, зөвхөн илгээсэн талбар өөрчлөгдөж, 200 буцаана.
Жишээ: POST /books + { "title": "Go" } нь 201 буцааж, id 5-тай шинэ ном үүсгэсэн. PATCH /books/4 + { "price": 99000 } нь зөвхөн үнийг өөрчилж, title хэвээрээ үлдсэн.

2. req.params ба req.query хоёрын аль нь заавал байх ёстой вэ?

params заавал бөйна, query нь сонголтоор байна. params нь URL-ийн нэг хэсэг (/books/:id) тул байхгүй бол route огт таарахгүй. query (?q=node) байхгүй ч route ажиллана.
Жишээ: /books/1 дээр req.params.id = "1". /books болон /books?q=node хоёулаа list руу очдог; q байвал шүүнэ, байхгүй бол бүгдийг буцаана. Мөн params, query хоёулаа үргэлж string байдаг тул Number() хэрэгтэй.

3. express.json()-ыг route-уудын доор бичвэл юу болох вэ?

req.body нь undefined болно. Express middleware-үүдийг дээрээс доош дарааллаар ажиллуулдаг. Parser доор байвал route ажиллах үед body хараахан задлагдаагүй байна.
Жишээ: Семинар 3-ын эхний POST дээр Cannot destructure property 'title' of 'req.body' as it is undefined алдаа гарсан.

4. Middleware дотор next() дуудахаа мартвал юу болох вэ?

Хүсэлт гацна. Хариу хэзээ ч ирэхгүй, Postman “Sending request...” гэж эргэлдсээр байна. Алдааны мэдээ гарахгүй, учир нь код алдаагүй дууссан, зүгээр л дараагийн шат руу дамжуулаагүй. Terminal дээр log гарвал middleware ажилласан ч цааш явуулаагүй гэсэн үг.
Жишээ: миний logger.js-ийн сүүлд next(); байгаа учир хүсэлт router руу хүрдэг.

5. find ба filter юугаараа ялгаатай вэ? Юу буцаадаг вэ?

find нэг object буцаадаг: эхний таарсныг өгнө, олдохгүй бол undefined. filter үргэлж array буцаадаг: бүх таарсныг өгнө, юу ч таарахгүй бол хоосон array [].
Жишээ: findBookById(1) нь нэг ном буцаадаг, тиймээс if (!book) шалгадаг. searchByTitle("node") нь 2 номтой array буцаадаг; searchByTitle("xyz") нь [] буцаана.

6. Ном байхгүй үед ямар status, route байхгүй үед ямар status вэ?

Хоёулаа 404, гэхдээ message нь өөр. Ном байхгүй үед route олдсон ч өгөгдөл алга, controller “Book not found” буцаана. Route байхгүй үед ямар ч route таараагүй, notFound middleware “Route not found” буцаана.
Жишээ: GET /books/99 нь “Book not found”, GET /unknown нь “Route not found” өгсөн.

7. await мартвал ямар утга гарч ирэх вэ?

Өгөгдөл биш, Promise { <pending> } гарч ирнэ. Promise бол "дараа бэлэн болно" гэсэн амлалт. await-гүй бол амлалт өөрөө буцна, тиймээс .title нь undefined болно. Server унахгүй, алдаа ч гарахгүй, тиймээс олоход хэцүү.
Жишээ: list дотор await getBooksFromDb() гэж бичдэг. await-гүй бол data.length нь undefined болно.

8. Error handler яагаад бусдаас доор бичигддэг вэ?

Express дээрээс доош явдаг тул бүх route-ын алдаа доош урсдаг. Error handler хамгийн доор байж байж дээрх бүх route-ын алдааг барьж чадна. Дээр байвал түүний доор бичигдсэн route-уудын алдааг барьж чадахгүй. Мөн 4 параметртэй (error, req, res, next) байх ёстой, Express үүгээр нь error handler гэж таньдаг.
Жишээ: /health дотор зориуд throw new Error("test") хийхэд error handler барьж авч, client-д зөвхөн "Internal server error" (500) илгээсэн, бүтэн stack-ийг terminal дээр л харуулсан.