import { useNavigate } from 'react-router-dom';

function BackIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>;
}

export default function PrivacyPage() {
  const navigate = useNavigate();
  return (
    <div className="page policy-page">
      <div className="policy-header">
        <button className="btn-back" onClick={() => navigate(-1)} aria-label="뒤로가기"><BackIcon /></button>
        <h2 className="policy-title">개인정보 처리방침</h2>
      </div>
      <div className="policy-content">
        <p className="policy-date">시행일: 2026년 4월 1일</p>
        <h3>1. 수집하는 개인정보</h3>
        <p>오늘의 점심 앱은 사용자의 개인정보를 서버로 전송하거나 저장하지 않습니다. 사용자가 기록한 식사 내역과 챌린지 설정은 사용자 기기의 로컬 스토리지에만 저장됩니다.</p>
        <h3>2. 개인정보의 이용 목적</h3>
        <ul>
          <li>식사 기록 관리 및 이번 주 내역 표시</li>
          <li>주간 식사비 챌린지 목표 및 달성 현황 추적</li>
        </ul>
        <h3>3. 개인정보의 보유 기간</h3>
        <p>모든 데이터는 기기 로컬 스토리지에만 저장되며, 브라우저 데이터 초기화 시 완전히 삭제됩니다.</p>
        <h3>4. 개인정보의 제3자 제공</h3>
        <p>본 앱은 어떠한 개인정보도 제3자에게 제공하지 않습니다.</p>
        <h3>5. 문의</h3>
        <p>고객지원 페이지를 통해 문의해 주세요.</p>
      </div>
    </div>
  );
}
