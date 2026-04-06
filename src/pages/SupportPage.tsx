import { useNavigate } from 'react-router-dom';

function BackIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>;
}

export default function SupportPage() {
  const navigate = useNavigate();
  return (
    <div className="page policy-page">
      <div className="policy-header">
        <button className="btn-back" onClick={() => navigate(-1)} aria-label="뒤로가기"><BackIcon /></button>
        <h2 className="policy-title">고객지원</h2>
      </div>
      <div className="policy-content">
        <h3>자주 묻는 질문</h3>
        <div className="faq-item">
          <h4>Q. 기록한 식사가 사라졌어요.</h4>
          <p>식사 기록은 기기 로컬 스토리지에 저장됩니다. 브라우저 캐시를 삭제하거나 시크릿 모드 사용 시 초기화될 수 있습니다.</p>
        </div>
        <div className="faq-item">
          <h4>Q. 주간 목표를 변경하고 싶어요.</h4>
          <p>챌린지 화면에서 + / - 버튼으로 목표 금액을 조정할 수 있습니다.</p>
        </div>
        <div className="faq-item">
          <h4>Q. 메뉴 추천이 마음에 들지 않아요.</h4>
          <p>결과 화면에서 '다시 추천' 버튼을 눌러 홈으로 돌아가 다시 선택해보세요.</p>
        </div>
        <h3>문의하기</h3>
        <p className="support-email"><strong>support@todaylunch.app</strong></p>
        <p className="support-note">영업일 기준 2-3일 내 답변 드립니다.</p>
      </div>
    </div>
  );
}
