export interface RecordType {
      // Trong antd table, dataSource phải có trường key nếu không sẽ báo lỗi sài material UI...vv thì không biết
      key: string;
      name: string;
      id_ISRC: string;
      duration: number;
      singer: string;
      author: string;
      type: string;
      format: string;
      timeValid: number;
      img: string;
      linkYoutube: string;
}
