var container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
var options = {
  //지도를 생성할 때 필요한 기본 옵션
  center: new kakao.maps.LatLng(37.3750, 126.6322), //지도의 중심좌표. 서울 한가운데
  level: 4, //지도의 레벨(확대, 축소 정도) 3에서 8레벨로 확대
};

var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

// 지도에 확대 축소 컨트롤을 생성
let zoomControl = new kakao.maps.ZoomControl();

// 지도의 우측에 확대 축소 컨트롤을 추가
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);


/*
**********************************************************
2. 더미데이터 준비하기 (제목, 주소, url, 카테고리)
*/
const dataSet = [
	{
	  title: "조가연마라탕",
	  address: "송도동 13-58",
	  url: "https://youtu.be/s2ZT6T5sJbU?si=tqHx7o_urLHLuVMS",
	  category: "중식",
	},
	{
	  title: "한식 뷔페",
	  address: "인천 연수구 하모니로 230 정호이앤씨 송도 신사옥 1층",
	  url: "https://youtu.be/s2ZT6T5sJbU?si=tqHx7o_urLHLuVMS",
	  category: "한식",
	},
	{
	  title: "최고당돈가스",
	  address: "송도동 12-1",
	  url: "https://youtu.be/s2ZT6T5sJbU?si=tqHx7o_urLHLuVMS",
	  category: "일식",
	},
  ];

  /*
**********************************************************
3. 여러개 마커 찍기
  * 주소 - 좌표 변환
https://apis.map.kakao.com/web/sample/multipleMarkerImage/ (여러개 마커)
https://apis.map.kakao.com/web/sample/addr2coord/ (주소로 장소 표시하기)
*/

// 주소 - 좌표 변환 함수 (비동기 문제 발생 해결) ****************
// 주소-좌표 변환 객체를 생성합니다
var geocoder = new kakao.maps.services.Geocoder();

function getCoordsByAddress(address) {
  // promise 형태로 반환
  return new Promise((resolve, reject) => {
    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(address, function (result, status) {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        return resolve(coords);
      }
      reject(new Error("getCoordsByAddress Error: not valid Address"));
    });
  });
}

async function setMap() {
  for (var i = 0; i < dataSet.length; i++) {
    let position = await getCoordsByAddress(dataSet[i].address);
    console.log(position);

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
      map: map, // 마커를 표시할 지도
      // position: positions[i].latlng, // 마커를 표시할 위치
      position: position,
      // title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
    });
  }
}

setMap();