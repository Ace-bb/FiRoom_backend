from django.http import HttpResponse, JsonResponse
from django.shortcuts import render

# Create your views here.
from matchPro.models import MatchProblem, UserShot, MasterAnswer, AnswerImages
import os


def listMatchProblemState(request):
    matchProblem_List = MatchProblem.objects.values()
    id = request.GET.get('masterId', None)
    print(id)

    if id:
        matchProblem_List = matchProblem_List.filter(masterId=id)
    matchProblem_List = list(matchProblem_List)
    # 获取用户上传的照片
    userShotId = matchProblem_List[0]['userShotId']
    userShot = UserShot.objects.values()
    if userShotId:
        userShot = userShot.filter(userShotId=userShotId)
    userShot_List = list(userShot)
    matchProblem_List[0]['userShots'] = userShot_List

    # 获取达人的回答信息
    answerMessageId = matchProblem_List[0]['answerMessageId']
    MasterUnswers = MasterAnswer.objects.values()
    if answerMessageId:
        MasterUnswers = MasterUnswers.filter(answerMessageId=answerMessageId)
    masterUnser_List = list(MasterUnswers)
    matchProblem_List[0]['userMessage'] = masterUnser_List[0]
    print(matchProblem_List)
    return JsonResponse({'code': 0, 'data': matchProblem_List, 'msg': 'success'})


def listStateDetail(request):
    MatchProblem_List = MatchProblem.objects.values()
    id = request.GET.get('userId', None)
    print(id)

    if id:
        MatchProblem_List = MatchProblem_List.filter(userID=id)
    MatchProblem_List = list(MatchProblem_List)
    # 获取用户上传的照片
    userShotId = MatchProblem_List[0]['userShotId']
    userShot = UserShot.objects.values()
    if userShotId:
        userShot = userShot.filter(userShotId=userShotId)
    userShot_List = list(userShot)
    MatchProblem_List[0]['userShots'] = userShot_List

    # 获取达人的回答信息
    answerMessageId = MatchProblem_List[0]['answerMessageId']
    MasterUnswers = MasterAnswer.objects.values()
    if answerMessageId:
        MasterUnswers = MasterUnswers.filter(answerMessageId=answerMessageId)
    masterUnser_List = list(MasterUnswers)
    MatchProblem_List[0]['answerMessage'] = masterUnser_List[0]

    # 获取回答所包含的图片
    answerImages = AnswerImages.objects.values()
    if answerMessageId:
        answerImages = answerImages.filter(answerMessageId=answerMessageId)
    answerImages = list(answerImages)
    MatchProblem_List[0]['answerImages'] = answerImages
    print(MatchProblem_List)
    return JsonResponse({'code': 0, 'data': MatchProblem_List, 'msg': 'success'})


def uploadShots(request):
    userShots = UserShot.objects.values()
    userShots = list(userShots)
    image = request.FILES['shotImages']
    print(image)
    print('uploadClothes')
    type = request.POST.get('fileName')
    print(type)
    basedir = 'D:\\ProgramSoft\\Git\\Virtual-try-on\\FiRoom_backend\\static\\userBodyShot\\user2\\'
    success = False
    if not os.path.exists(basedir + type + '.jpg'):
        with open(basedir + type + '.jpg   ', 'wb') as f:
            f.write(image.read())
            success = True
            f.close()
    print(success)
    imgUrl = 'static/userBodyShot/user2/' + type + '.jpg'
    record = UserShot.objects.create(userShotId=1001 + len(userShots), shotUrl=imgUrl)
    return JsonResponse({'res': 0, 'msg': 'success'})


def saveQuestionData(request):
    problems = MatchProblem.objects.values()
    userShots = UserShot.objects.values()
    problems = list(problems)
    userShots = list(userShots)
    print(problems)
    reward = request.GET.get('reward')
    title = request.GET.get('title')
    mainText = request.GET.get('mainText')
    avatarUrl = request.GET.get('avatarUrl')
    nickName = request.GET.get('nickName')
    record = MatchProblem.objects.create(userID=len(problems) + 1, userName=nickName,
                                         userIcon=avatarUrl,
                                         questionDetail=mainText, userShotId=1001 + len(userShots),
                                         userOfferMoney=reward,
                                         answerMessageId=1, browseNum=0, likeNum=0)
    return JsonResponse({'res': 0, 'msg': 'success'})
