import { Modal } from 'antd';
import ReactPlayer from 'react-player/youtube';
import './YoutubeBox.css';
type YoutubeProps = {
      url: string;
      isShow: boolean;
      handleHide: () => void;
};

export const YoutubeBox = ({ url, isShow, handleHide }: YoutubeProps) => {
      return (
            <Modal
                  className="wrapper-YoutubeBox"
                  onCancel={handleHide}
                  open={isShow}
                  footer={null}
                  closeIcon={<></>}
                  centered={true}
            >
                  <ReactPlayer stopOnUnmount={true} url={url} controls width="100%" />
            </Modal>
      );
};
