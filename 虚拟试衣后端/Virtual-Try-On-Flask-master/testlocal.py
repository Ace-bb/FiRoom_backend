from Model import Model
import numpy as np
from PIL import Image
import matplotlib.pyplot as plt
import time
import cv2

import os
os.environ["CUDA_VISIBLE_DEVICES"] = "0"
# 载入模型
model = Model("checkpoints/jpp.pb",
              "checkpoints/gmm.pth",
              "checkpoints/tom.pth")
# 载入人物图片
p_label = 'shot5.png'
img_path_dir = 'D:\\ProgramSoft\\Git\\Virtual-try-on\\FiRoom_backend\\static\\userBodyShot'
img_path = os.path.join(img_path_dir, p_label)
if (os.path.isfile(img_path)):
    img = np.array(Image.open(img_path))
    plt.imshow(img)
    plt.show()
    print("导入人物图片成功")
else:
    print("导入人物图片失败")
#载入衣物图片
c_label = '000010_1.png'
c_path_dir = 'D:\\ProgramSoft\\Git\\Virtual-try-on\\FiRoom_backend\\static\\clothes_hamper'
c_path = os.path.join(c_path_dir, c_label)
if (os.path.isfile(img_path)):
    c_img = np.array(Image.open(c_path))
    plt.imshow(c_img)
    plt.show()
    print("导入衣物图片成功")
else:
    print("导入衣物图片失败")
start = time.time()
print("""
===================
虚拟试衣中，请耐心等待
===================
""")
result, trusts = model.predict(img, c_img, need_pre=False,check_dirty=True)
print("虚拟试衣完成")
if result is not None:
    end = time.time()
    print("耗时:"+str(end-start))
    print("置信度"+str(trusts))
    plt.imshow(result)
    plt.show()
    print("生成图片成功")
