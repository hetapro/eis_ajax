from bsddb import db
from django.views import generic

from emp.models import Employee,Department
from emp.serializers import DepSerializer, EmployeeSerializer
from rest_framework import viewsets


class Department_List(viewsets.ModelViewSet):
    model = Department
    queryset = Department.objects.all()
    serializer_class = DepSerializer

class Employee_List(viewsets.ModelViewSet):
    model = Employee
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

class IndexView(generic.TemplateView):
    template_name = 'emp/index.html'


class List1(generic.ListView):
  #  context_object_name = 'depl'
    template_name = 'emp/list1.html'
    model=Department
   # def get_queryset(self):
    #   return Department.objects.all()

class List(generic.ListView):
    #context_object_name = 'empl'
    template_name = 'emp/list.html'
    model = Employee
    #def get_queryset(self):
     #  return Employee.objects.all()

